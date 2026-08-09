
let createWav;

let resolveReady;
let ready = new Promise((res) => {
    resolveReady = res;
});

function timestamps() {
    return {
        timestamps: {
            access: new Date(),
            change: new Date(),
            modification: new Date(),
        },
    };
}

{
    async function main() {
        let [
            phontab,
            phondata,
            phonindex,
            intonations,
            en_dict,
            en_US,
        ] = await Promise.all(espeakFetch([
            "phontab",
            "phondata",
            "phonindex",
            "intonations",
            "en_dict",
            "lang/gmw/en-US",
        ]));
        let speakNgBuffer = await fetch("/speak-ng.wasm").then((res) => res.arrayBuffer());
        let { WASI } = await import("/lib/runno.js");
        async function play(text, options = {}) {
            let wasi = new WASI({
                args: [
                    "speak-ng",
                    "-w", "wav.wav",
                    "-v", "en-us",
                    "-p", String(options.pitch || 50),
                    "-s", String(options.speed || 175),
                    "--path=/espeak",
                    "--",
                    text,
                ],
                stdout: console.log,
                stderr: console.error,
                fs: {
                    "/espeak/phontab": {
                        path: "/espeak/phontab",
                        ...timestamps(),
                        mode: "binary",
                        content: phontab,
                    },
                    "/espeak/phondata": {
                        path: "/espeak/phondata",
                        ...timestamps(),
                        mode: "binary",
                        content: phondata,
                    },
                    "/espeak/phonindex": {
                        path: "/espeak/phonindex",
                        ...timestamps(),
                        mode: "binary",
                        content: phonindex,
                    },
                    "/espeak/intonations": {
                        path: "/espeak/intonations",
                        ...timestamps(),
                        mode: "binary",
                        content: intonations,
                    },
                    "/espeak/en_dict": {
                        path: "/espeak/en_dict",
                        ...timestamps(),
                        mode: "binary",
                        content: en_dict,
                    },
                    "/espeak/lang/gmw/en-US": {
                        path: "/espeak/lang/gmw/en-US",
                        ...timestamps(),
                        mode: "binary",
                        content: en_US,
                    },
                },
            });
            let wasm = await WebAssembly.instantiate(speakNgBuffer, {
                ...wasi.getImportObject(),
            });
            await wasi.start(wasm);
            return wasi.drive.fs["/wav.wav"].content;
        }
        createWav = play;
    }
    main().then(() => {
        resolveReady();
    });
}

function espeakFetch(arr) {
    return arr.map((url) => {
        return fetch(`/espeak-ng-data/${url}`)
            .then(data => data.arrayBuffer())
            .then(data => new Uint8Array(data));
    });
}

onmessage = async (e) => {
    await ready;
    let { id, text, options } = e.data;
    let wav = await createWav(text, options);
    postMessage({ id, wav }, [wav.buffer]);
};
