let taskId = 0;
let tasks = new Map();

let ttsWorker = new Worker("./lipspeakWorker.js", { type: "module" });
let audioCtx = new AudioContext();
let gainNode = new GainNode(audioCtx, { gain: 1 });
gainNode.connect(audioCtx.destination);

export function setVolume (vol) {
    if (vol === 0) {
        gainNode.gain.value = 0;
    } else {
        gainNode.gain.value = 10 ** ((25 * vol + -25) / 20);
    }
}

function play(text, options = {}, onend = () => {}, onstart = () => {}, signal = { aborted: false }) {
    let id = taskId++;
    text = text
        .replace(/(.{5,}?)\1{5,}/gi, "$1$1$1$1$1") // anti copy paste spam
        .replace(/[԰-֏ऀ-૿஀-௿ఀ-෿Ⴀ-ᇿ꜀-퟿]/g, "") // these load non-english dictionaries
        .replace(/\[\[/g, "") // don't let phoneme input through
        .replaceAll("&", "&amp;") // SSML 
        .replaceAll("<", "&lt;");
    tasks.set(id, { onstart, onend, signal });
    ttsWorker.postMessage({ id, text, options });
}

function playSSML(text, options = {}, onend = () => {}, onstart = () => {}, signal = { aborted: false }) {
    let id = taskId++;
    tasks.set(id, { onstart, onend, signal });
    ttsWorker.postMessage({ id, text, options });
}

export let speak = {
    play,
    playSSML,
};

ttsWorker.addEventListener("message", async (e) => {
    let { id, wav, lip, hz } = e.data;
    let task = tasks.get(id);
    if(task.signal.aborted) {
        tasks.delete(id);
        return;
    }
    let buffer = audioCtx.createBuffer(1, wav.length, hz);
    buffer.copyToChannel(wav, 0);
    let source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(gainNode);
    if (audioCtx.state === "suspended") audioCtx.resume();
    source.start();
    let lipTimings = [];
    let dataView = new DataView(lip.buffer);
    for (let i = 0; i < dataView.byteLength; i += 12) {
        let ms = dataView.getInt32(i, true);
        let str = "";
        for (let j = i + 4; j < i + 12; j++) {
            let char = dataView.getUint8(j);
            if (!char) break;
            str += String.fromCharCode(char);
        }
        lipTimings.push([ms, str]);
    }
    task.onstart(source, lipTimings); 
    source.addEventListener("ended", () => {
        task.onend();
        tasks.delete(id);
    });
});