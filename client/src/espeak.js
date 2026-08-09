let taskId = 0;
let tasks = new Map();

let ttsWorker = new Worker("./espeakWorker.js", { type: "module" });
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
    text = text.replace(/(.{5,}?)\1{5,}/gi, "$1$1$1$1$1");
    tasks.set(id, { onstart, onend, signal });
    ttsWorker.postMessage({ id, text, options });
}

export let speak = {
    play,
};

ttsWorker.addEventListener("message", async (e) => {
    let { id, wav } = e.data;
    let task = tasks.get(id);
    if(task.signal.aborted) {
        tasks.delete(id);
        return;
    }
    let buffer = await audioCtx.decodeAudioData(wav.buffer);
    let source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(gainNode);
    source.start();
    task.onstart(source, {}); 
    source.addEventListener("ended", () => {
        task.onend();
        tasks.delete(id);
    });
});