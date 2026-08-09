import lipspeakModule from "./lipspeak.js";

let lipspeak, hz;
let readyPromise = new Promise(async (resolve) => {
    lipspeak = await lipspeakModule();
    lipspeak._init();
    hz = lipspeak._get_hz();
    resolve();
});

function readBuffer(ptr) {
    let base = ptr >>> 2;
    return {
        ptr: lipspeak.HEAPU32[base + 0],
        cap: lipspeak.HEAPU32[base + 1],
        len: lipspeak.HEAPU32[base + 2], 
    };
}

onmessage = async (opt) => {
    console.log(JSON.stringify(opt.data.options))
    await readyPromise;
    let id = opt.data.id;
    let lipptr = lipspeak._malloc(12);
    let wavptr = lipspeak._malloc(12);
    let txtlen = lipspeak.lengthBytesUTF8(opt.data.text) + 1;
    let txtptr = lipspeak._malloc(txtlen);
    lipspeak.stringToUTF8(opt.data.text, txtptr, txtlen);
    lipspeak._speak(txtptr, opt.data.options.pitch ?? 50, opt.data.options.speed ?? 175, lipptr, wavptr);
    let lipbuf = readBuffer(lipptr);
    let wavbuf = readBuffer(wavptr);
    let lip = lipspeak.HEAPU8.slice(lipbuf.ptr, lipbuf.ptr + lipbuf.len);
    let wav = lipspeak.HEAPF32.slice(wavbuf.ptr >>> 2, (wavbuf.ptr + wavbuf.len) >>> 2);
    lipspeak._free_buffer(lipptr);
    lipspeak._free_buffer(wavptr);
    lipspeak._free(lipptr);
    lipspeak._free(wavptr);

    postMessage({ id, lip, wav, hz }, null, [ lip, wav ]);
}