if (typeof String.prototype.replaceAll === "undefined") {
    String.prototype.replaceAll = function (match, replace) {
        match = match.replace(/[-[\]{}()*+?.\\\/^$|]/g, "\\$&");
        return this.replace(new RegExp(match, "g"), replace);
    }
}

let speak = { play: () => {} };
let setVolume = () => {};
let gravity = false;

import(localStorage.legacyTTS === "true" ? "./espeak.js" : "./liblipspeak.js").then((mod) => {
    speak = mod.speak;
    setVolume = mod.setVolume;
    setVolume(localStorage.volume / 100);
});

let me = "";
let trusted = false;
let admin = false;
let king = false;
let autorejoin = true;
let blockerror = false;
let unlocks = [];

const { entries, values, keys } = Object;
const { isArray } = Array;
const { seedrandom, random, floor } = Math;

const MOUTH_SPRITES = { CL: 0, E1: 142, E2: 143, E3: 144, E4: 145, O2: 146, O1: 147 };
const PHONEME_TO_MOUTH = {
    "a": MOUTH_SPRITES.E3, "aa": MOUTH_SPRITES.E3, "a:": MOUTH_SPRITES.E3, "A:": MOUTH_SPRITES.E3, "A@": MOUTH_SPRITES.E3,
    "eI": MOUTH_SPRITES.E4, "E": MOUTH_SPRITES.E4, "3": MOUTH_SPRITES.O2, "3:": MOUTH_SPRITES.O2, "e@": MOUTH_SPRITES.E2,
    "i": MOUTH_SPRITES.E4, "i:": MOUTH_SPRITES.E4, "i@": MOUTH_SPRITES.E2, "i@3": MOUTH_SPRITES.E2, "I": MOUTH_SPRITES.E3, 
    "I2": MOUTH_SPRITES.E3, "I#": MOUTH_SPRITES.E3, "aI": MOUTH_SPRITES.E4, "0": MOUTH_SPRITES.E3,
    "oU": MOUTH_SPRITES.O1, "O": MOUTH_SPRITES.E3, "O:": MOUTH_SPRITES.E3, "OI": MOUTH_SPRITES.O1, "O@": MOUTH_SPRITES.O2, "o@": MOUTH_SPRITES.O2,
    "aU": MOUTH_SPRITES.O1, "U": MOUTH_SPRITES.O1, "U@": MOUTH_SPRITES.O2, "u": MOUTH_SPRITES.O1, "u:": MOUTH_SPRITES.O1,
    "V": MOUTH_SPRITES.E4, "a#": MOUTH_SPRITES.E2, "@": MOUTH_SPRITES.E2, "@2": MOUTH_SPRITES.O2, "@-": MOUTH_SPRITES.O2,
    "b": MOUTH_SPRITES.CL, "d": MOUTH_SPRITES.E1, "f": MOUTH_SPRITES.E1, "g": MOUTH_SPRITES.E1, "h": MOUTH_SPRITES.E1,
    "dZ": MOUTH_SPRITES.O1, "Z": MOUTH_SPRITES.O1, "k": MOUTH_SPRITES.E1, "@L": MOUTH_SPRITES.E2, "l": MOUTH_SPRITES.E1,
    "m": MOUTH_SPRITES.CL, "n": MOUTH_SPRITES.E1, "n-": MOUTH_SPRITES.E1, "N": MOUTH_SPRITES.E1,
    "p": MOUTH_SPRITES.CL, "r": MOUTH_SPRITES.O2, "r-": MOUTH_SPRITES.O2, "s": MOUTH_SPRITES.E1, "S": MOUTH_SPRITES.O2,
    "t": MOUTH_SPRITES.E1, "t#": MOUTH_SPRITES.E1, "t2": MOUTH_SPRITES.E1, "T": MOUTH_SPRITES.E1, "tS": MOUTH_SPRITES.O1,
    "D": MOUTH_SPRITES.E1, "v": MOUTH_SPRITES.E1, "w": MOUTH_SPRITES.O1, "j": MOUTH_SPRITES.E1, "z": MOUTH_SPRITES.E1,
    ";": -1, "_": MOUTH_SPRITES.CL, "_:": MOUTH_SPRITES.CL
};

function clamp(min, x, max) {
    return Math.min(Math.max(x, min), max);
}

function s4() {
    return floor((1 + random()) * 0x10000).toString(16).substring(1);
}
// F*ck safari
if (/iP(ad|hone|od)/.test(navigator.userAgent)) {
    let timeout;
    document.addEventListener("touchstart", (e) => {
        if (e.touches.length > 1) {
            clearTimeout(timeout);
            return;
        };
        let touch = e.touches[0];
        timeout = setTimeout(() => {
            let event = new MouseEvent("contextmenu", {
                bubbles: true,
                cancelable: true,
                clientX: touch.clientX,
                clientY: touch.clientY,
            });
            console.log(e, event);
            e.target.dispatchEvent(event);
        }, 500);
    });
    document.addEventListener("touchend", () => clearTimeout(timeout));
    document.addEventListener("touchmove", () => clearTimeout(timeout));
}


function sanitize(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&apos;");
}


window.onclick = (e) => {
    let spoiler = e.target.closest("GAY-SPOILER");
    if (spoiler) spoiler.classList.add("reveal");
};

let rules = {
    "**": "b",
    "~~": "i",
    "--": "s",
    "__": "u",
    "``": "code",
    "^^": "gay-big", // these are fine
    "$r$": "gay-rainbow",
    "||": "gay-spoiler",
    "%%": "marquee",
}

function markup(text) {
    text = sanitize(text);
    text = text
        .replace(/(^|\\n)(&gt;.*?)($|\\n)/g, "$1<span class=\"greentext\">$2</span>$3")
        .replaceAll("\\n", "<br>");

    let tokenList = keys(rules).sort((a, b) => b.length - a.length);

    let parts = [];
    let i = 0;
    while (i < text.length) {
        let matched = false;
        for (let token of tokenList) {
            if (text.slice(i, i + token.length) === token) {
                parts.push({ type: "token", token });
                i += token.length;
                matched = true;
                break;
            }
        }
        if (!matched) {
            if (parts.length > 0 && parts[parts.length - 1].type === "text") {
                parts[parts.length - 1].value += text[i];
            } else {
                parts.push({ type: "text", value: text[i] });
            }
            i++;
        }
    }

    let stack = [];
    let result = "";
    for (let part of parts) {
        if (part.type === "text") {
            result += part.value;
            continue;
        }
        let token = part.token;
        let tag = rules[token];
        let idx = stack.indexOf(token);
        if (idx === -1) {
            stack.push(token);
            result += `<${tag}>`;
        } else {
            let toReopen = [];
            while (stack.length > idx + 1) {
                let inner = stack.pop();
                result += `</${rules[inner]}>`;
                toReopen.push(inner);
            }
            stack.pop();
            result += `</${tag}>`;
            for (let r of toReopen.reverse()) {
                stack.push(r);
                result += `<${rules[r]}>`;
            }
        }
    }

	while (stack.length > 0) {
        let token = stack.pop();
        result += `</${rules[token]}>`;
    }

    text = result;
    text = text
        .replaceAll("{FRANCE}", "<img src=\"./img/icon/france.svg\" class=\"flag\" alt=\"\u{1F1EB}\u{1F1F7}\">")
        .replace(/(https?:\/\/[^\s<>"']+)/g, "<a target=\"_blank\" href=\"$1\">$1</a>");
    return text;
}

function nmarkup(text) {
    while (text.includes("^^") || text.includes("||") || text.includes("\\n") || text.includes("%%")) {
        text = text.replaceAll("^^", "").replaceAll("||", "").replaceAll("\\n", "").replaceAll("%%", "");
    }
    return markup(text);
}

function misolate(text) {
    let tokens = [];
    for (let i = 0; i < text.length; i++) {
        for (let token of keys(rules)) {
            if (text.slice(i, i + token.length) === token) {
                if (tokens.includes(token)) {
                    tokens.splice(tokens.indexOf(token), 1);
                } else {
                    tokens.unshift(token);
                }
            }
        }
    }
    return text + tokens.join("");
}

function nisolate(text) {
    while (text.includes("^^") || text.includes("||") || text.includes("\\n")) {
        text = text.replaceAll("^^", "").replaceAll("||", "").replaceAll("\\n", "");
    }
    return misolate(text);
}

function markdownToSpeech(say, french) {
    return say
        .replace(/\|\|.+?(\|\||$)/g, french ? "divulgacher" : "spoiler")
        .replace(/\^\^|\$r\$|\*\*|--|~~|__|\\n|%%/g, "");
}

const pollColors = [
    ["lime", "#cfc", "#060"],
    ["red", "#fcc", "#600"],
    ["#0055ff", "#cceeff", "#036"],
    ["yellow", "#ffc", "#660"],
    ["magenta", "#fcf", "#606"],
];

function createPoll(poll, opt = {}) {
    let element = document.createElement("div");
    element.classList.add("poll");
    element.classList.add(`poll_${poll.id}`);
    
    let html = `${markup(poll.title)}<br>`;
    
    poll.options.forEach((option, i) => {
        html += `<div class="poll_option option_${i}">${nmarkup(option)}: <span class="option_number">0</span></div>`;
    });
    
    element.innerHTML = html;
    element.poll = poll;
    
    poll.options.forEach((option, i) => {
        let optionElement = element.querySelector(`.option_${i}`);
        optionElement.onclick = () => {
            socket.emit("vote", {
                poll: poll.id,
                vote: i,
            });
            if (opt.onvote) opt.onvote({ vote: i });
        };
        let [color1, color2, border] = pollColors[i % pollColors.length];
        let percent = 1 / poll.options.length * 100;
        optionElement.style.backgroundImage = 
            `linear-gradient(to right, ${color1} ${percent}%, ${color2} ${percent}%)`;
        optionElement.style.borderColor = border;
    });

    return element;
}

function updatePoll(id, voterId, vote) {
    let elements = document.querySelectorAll(`.poll_${id}`);
    if (elements.length === 0) return;
    let poll = elements[0].poll;
    if (vote !== null) poll.votes[voterId] = vote;
    

    let counts = new Array(poll.options.length).fill(0);
    Object.values(poll.votes).forEach(v => {
        if (v >= 0 && v < counts.length) counts[v]++;
    });
    
    let totalVotes = Object.values(poll.votes).length;
    
    for (let element of elements) {
        poll.options.forEach((_, i) => {
            let count = counts[i];
            let percentage = count / totalVotes * 100;
            let [color1, color2] = pollColors[i];
            
            element.querySelector(`.option_${i} .option_number`).innerText = count;
            element.querySelector(`.option_${i}`).style.backgroundImage = 
                `linear-gradient(to right, ${color1} ${percentage}%, ${color2} ${percentage}%)`;
        });
    }
}

let lastZ = 1;
let dragged = null;
let dragX = 0;
let dragY = 0;
let chatLogDragged = false;

let colors = ["purple", "blue", "green", "yellow", "red", "pink", "brown", "black", "cyan", "black", "pope", "blessed", "white"];
let hats = ["tophat", "bfdi", "bieber", "evil", "elon", "kamala", "maga", "troll", "bucket", "obama", "dank", "witch", "wizard"]

let quote = null;
let lastUser = "";

function time() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let hourString = String(hours % 12).padStart(2, "0");
    let minuteString = String(minutes).padStart(2, "0");
    let ampm = hours >= 12 ? "PM" : "AM";
    return `${hourString}:${minuteString} ${ampm}`;
}

function bonzilog(id, name, html, color, text, single, msgid) {
    // hacky
    // remind me to rewrite this as this is the biggest peice of dogshit
    let icon = "";
    let scrolled = chat_log_content.scrollHeight - chat_log_content.clientHeight - chat_log_content.scrollTop <= 20;
    if (color) {
        let [baseColor, ...hats] = color.split(" ");
        icon = `<div class="log_icon">
            <img class="color" src="img/pfp/${baseColor}.webp">
            ${hats.map(hat => `<img class="hat" src="img/pfp/${hat}.webp">`).join(" ")
            }
        </div>`;
    } else {
        icon = `<div class="log_left_spacing"></div>`;
    }
    let thisUser = `${id};${name};${color}`;
    let showDelete = (admin || king) && msgid;
    if (thisUser !== lastUser || single) {
        let timeString = `<span class="log_time">${time()}</span>`;
        chat_log_content.insertAdjacentHTML("beforeend", `
            <hr>
            <div class="log_message" ${msgid ? `id="msg_${msgid}"` : ""}>
                ${icon}
                <div class="log_message_cont">
                    <div class="reply"></div>
                    ${showDelete ? "<div class=\"delete\"></div><div class=\"ban\"></div>" : ""}
                    <span><b>${nmarkup(name)}</b> ${name ? timeString : ""}</span>
                    <div class="log_message_content">${html} ${name ? "" : timeString}</div> 
                </div>
            </div>`);
        lastUser = single ? "" : thisUser;
    } else {
        chat_log_content.insertAdjacentHTML("beforeend", `
            <div class="log_message log_continue" ${msgid ? `id="msg_${msgid}"` : ""}>
                <div class="reply"></div>
                ${showDelete ? "<div class=\"delete\"></div><div class=\"ban\"></div>" : ""}
                <div class="log_left_spacing"></div>
                <div class="log_message_cont">
                    <div class="log_message_content">${html}</div>
                </div>
            </div>`);
    }
    chat_log_content.lastChild.querySelector(".reply").onclick = () => {
        quote = { name, text };
        if (id === "server") quote.name = "SERVER";
        talkcard.innerHTML = `Replying to ${nmarkup(quote.name)}`;
        chat_message.focus();
        talkcard.hidden = false;
    };
    chat_log_content.lastChild.onauxclick = (e) => {
        if (e.button === 1) {
            cmd(`delete ${msgid}`);
        }
    };
    if (showDelete) {
        chat_log_content.lastChild.querySelector(".delete").onclick = () => {
            cmd(`delete ${msgid}`);
        };
        chat_log_content.lastChild.querySelector(".ban").onclick = () => {
            cmd(`banmsg ${msgid}`);
        };
    }
    if (scrolled) {
        chat_log_content.scrollTop = chat_log_content.scrollHeight;
    }
}

function toBgImg(name, color) {
    return `url("img/bonzi/${color.split(" ")[0]}.webp")`;
}

function toHatImg(color) {
    let [base, ...hats] = color.split(" ");
    return hats.map(hat => `url("img/bonzi/${hat}.webp")`).reverse().join(", ");
}

let logJoins = false;

class Bonzi {
    #mediaReady = false;

    constructor(id, userPublic) {
        this.userPublic = userPublic || {
            name: "BonziBUDDY",
            color: "purple",
            speed: 175,
            pitch: 50,
            voice: "en-us",
        };
        this.color = this.userPublic.color;
        this.data = window.BonziData;

        this.eventList = [];
        this.eventFrame = 0;
        this.currentAnim = "idle";
        this.animFrame = 0;
        this.sprite = 0;
        this.lipTimings = [];
        this.lipStartTime = 0;

        this.mute = false;
        this.id = id || s4() + s4();

        this.rng = new seedrandom(this.id || random());
        this.abortController = new AbortController();

        this.element = document.createElement("div");
        this.element.classList.add("bonzi");
        this.element.style.backgroundImage = this.toBgImg();

        this.hatLayer = document.createElement("div");
        this.hatLayer.classList.add("bonzi_hat");
        this.hatLayer.style.backgroundImage = toHatImg(this.color);
        this.element.appendChild(this.hatLayer);
        this.element.style.zIndex = lastZ++;
        this.nametag = document.createElement("div");
        this.nametag.classList.add("bonzi_name");
        this.element.appendChild(this.nametag);
        this.tag = document.createElement("div");
        this.tag.classList.add("bonzi_tag");
        this.element.appendChild(this.tag);
        this.bubble = document.createElement("div");
        this.bubble.classList.add("bubble");
        this.bubble.hidden = true;
        this.bubbleCont = document.createElement("div");
        this.bubbleCont.classList.add("bubble_cont");
        this.bubble.appendChild(this.bubbleCont);
        this.element.appendChild(this.bubble);
        content.appendChild(this.element);

        this.updateName();
        this.updateSprite();
        this.updateTag();

        this.element.onpointerdown = (e) => {
            if (this.bubble.contains(e.target)) return;
            if (e.which === 1) {
                if (!gravity) dragged = this;
                dragX = e.pageX - this.x;
                dragY = e.pageY - this.y;
                this.lastX = this.x;
                this.lastY = this.y;
                this.element.style.zIndex = lastZ++;
            }
            if (e.which === 2) {
                this.cancel();
                this.mute = !this.mute;
                this.updateName();
            }
        };
        this.element.addEventListener("contextmenu", (e) => {
            if (this.bubble.contains(e.target)) e.stopPropagation();
        });
        this.element.onclick = (e) => {
            if (this.bubble.contains(e.target)) return;
            if (this.x === this.lastX && this.y === this.lastY) {
                this.cancel();
            }
        };

        this.shuffle();
        this.element.id = s4() + s4();

        this.banReason = "Spambotting";
        $.contextMenu({
            selector: `#${this.element.id}`,
            build: () => {
                return {
                    items: {
                        "cancel": {
                            name: "Cancel",
                            callback: () => { this.cancel(); }
                        },
                        "mute": {
                            name: () => this.mute ? "Unmute" : "Mute",
                            callback: () => {
                                this.cancel();
                                this.mute = !this.mute;
                                this.updateName();
                            }
                        },
                        "asshole": {
                            name: "Call an Asshole",
                            callback: () => {
                                cmd(`asshole ${this.userPublic.name}`);
                            }
                        },
                        "owo": {
                            name: "Notice Bulge",
                            callback: () => {
                                cmd(`owo ${this.userPublic.name}`);
                            }
                        },
                        "hey": {
                            name: `Hey, ${nmarkup(nisolate(this.userPublic.name))}!`,
                            isHtmlName: true,
                            callback: () => {
                                socket.emit("talk", {
                                    text: `Hey, ${this.userPublic.name}!`,
                                });
                            }
                        },
                        "fun": {
                            name: "Fun (Mod)",
                            items: {
                                "bless": {
                                    name: "Bless",
                                    callback: () => {
                                        cmd(`bless ${this.id}`);
                                    },
                                },
                                "nameedit": {
                                    name: "Change Name",
                                    callback: () => {
                                        cmd(`nameedit ${this.id} ${prompt("give this guy a name")}`);
                                    },
                                },
                                "tagedit": {
                                    name: "Change Tag",
                                    callback: () => {
                                        cmd(`tagedit ${this.id} ${prompt("give this guy a tag")}`);
                                    },
                                },
                                "nuke": {
                                    name: "NUKE",
                                    callback: () => {
                                        cmd(`nuke ${this.id}`);
                                    }
                                },
                            },
                            visible: () => admin || king,
                        },
                        "mod": {
                            name: "Mod",
                            items: {
                                "banreason": {
                                    name: "Ban/Kick Reason",
                                    type: "text",
                                    value: this.banReason,
                                    events: {
                                        input: (e) => {
                                            this.banReason = e.target.value;
                                        },
                                    },
                                },
                                "kick": {
                                    name: "Kick",
                                    callback: () => {
                                        cmd(`kick ${this.id, this.banReason}`);
                                    },
                                },
                                "tempban": {
                                    name: "Temp Ban (5m)",
                                    callback: () => {
                                        cmd(`tempban short ${this.id} ${this.banReason}`);
                                    },
                                },
                                "tempban2": {
                                    name: "Temp Ban (1h)",
                                    callback: () => {
                                        cmd(`tempban long ${this.id} ${this.banReason}`);
                                    },
                                },
                                "shush": {
                                    name: "Shush",
                                    callback: () => {
                                        cmd(`shush ${this.id}`);
                                    },
                                },
                            },
                            visible: () => admin || king,
                        },
                        "pope": {
                            name: "godmode",
                            items: {
                                "ban": {
                                    name: "Ban",
                                    callback: () => {
                                        cmd(`ban ${this.id}`);
                                    },
                                },
                                "info": {
                                    name: "Info",
                                    callback: () => {
                                        cmd(`info ${this.id}`);
                                    },
                                }
                            },
                            visible: () => admin,
                        }
                    }
                };
            },
            animation: {
                duration: 175,
                show: 'fadeIn',
                hide: 'fadeOut'
            }
        });
        this.eventList = [{
            type: "anim",
            anim: "surf_intro",
            ticks: 30
        }, { type: "idle" }];
        if (gravity) {
            this.element.classList.add("box2d");
            addElement(this.element);
        }
    }

    toBgImg() {
        return toBgImg(this.userPublic.name, this.color);
    }

    move(x, y) {
        if (arguments.length !== 0) {
            this.x = x;
            this.y = y;
        }
        let max = this.maxCoords();
        let min = this.minCoords();
        this.x = clamp(min.x, this.x, max.x);
        this.y = clamp(min.y, this.y, max.y);
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.updateDialog();
    }

    runEvent(list) {
        if (this.mute) return;
        this.cancel();
        this.eventList = [{ type: "idle" }, ...list, { type: "idle" }];
    }

    clearDialog() {
        this.bubbleCont.textContent = "";
        this.bubble.hidden = true;
        this.stopSpeaking();
    }

    cancel() {
        this.clearDialog();
        this.eventList = [{ type: "idle" }];
        this.eventFrame = 0;
    }

    stopSpeaking() {
        this.abortController.abort();
        this.abortController = new AbortController();
        if (this.voiceSource) {
            this.voiceSource.stop();
        }
        this.lipTimings = [];
        this.lipStartTime = 0;
    }

    setSprite(sprite) {
        this.sprite = sprite;
        this.element.style.backgroundPositionX = `-${sprite % 12 * 200}px`;
        this.element.style.backgroundPositionY = `-${floor(sprite / 12) * 160}px`;
        this.hatLayer.hidden = !(sprite === 0 || sprite >= 142);
    }

    setAnim(anim) {
        this.currentAnim = anim;
        this.animFrame = 0;
    }
    
    update() {
        let anim = this.data.sprite.animations[this.currentAnim];
        let frame = anim[this.animFrame];
        while (typeof frame === "string") {
            this.setAnim(frame);
            anim = this.data.sprite.animations[this.currentAnim];
            frame = anim[this.animFrame];
        }
        if (frame != null) this.setSprite(frame);
        this.animFrame++;

        if (this.eventList.length === 0) {
            return;
        }
        let nextEvent = () => {
            this.eventList.shift();
            this.eventFrame = 0;
        };
        let event = this.eventList[0];
        let eventType = event.type;
        switch (eventType) {
            case "anim":
                if (this.eventFrame === 0) {
                    this.setAnim(event.anim);
                }
                this.eventFrame++;
                if (this.eventFrame >= event.ticks) {
                    nextEvent();
                }
                break;
            case "text":
                if (this.eventFrame === 0) {
                    this.talk(event.text, event.say, {
                        quote: event.quote,
                        french: event.french,
                        xss: event.xss,
                        msgid: event.msgid,
                    });
                    this.eventFrame = 1;
                };
                if (this.bubble.hidden) nextEvent();
                break;
            case "idle":
                if (this.eventFrame === 0) {
                    this.eventFrame = 1;
                    let toIdle = this.data.to_idle[this.currentAnim];
                    if (toIdle) {
                        this.setAnim(toIdle);
                    } else {
                        this.setAnim("idle");
                    }
                }
                if (this.sprite === 0) {
                    nextEvent();
                }
                break;
            case "add_random":
                let pool = event.pool;
                let index = floor(pool.length * this.rng());
                let events = pool[index];
                nextEvent();
                for (let e of events.toReversed()) {
                    this.eventList.unshift(e);
                }
                break;
            case "image":
                if (this.eventFrame === 0) {
                    this.#showImage(event.url, event.msgid);
                }
                this.eventFrame++;
                if (this.eventFrame > 15 * 10) this.clearDialog();
                if (this.bubble.hidden && this.#mediaReady) nextEvent();
                break;
            case "video":
                if (this.eventFrame === 0) {
                    this.#showVideo(event.url, event.msgid);
                }
                this.eventFrame++;
                let video = this.bubble.querySelector("video");
                if (!video?.paused || document.fullscreenElement === video) this.eventFrame = 1;
                if (this.eventFrame > 15 * 10) this.clearDialog();
                if (this.bubble.hidden && this.#mediaReady) nextEvent();
                break;
            case "poll":
                if (this.eventFrame === 0) {
                    this.#showPoll(event.id, event.text, event.options);
                }
                this.eventFrame++;
                if (this.eventFrame > 15 * 30) this.clearDialog();
                if (this.bubble.hidden) nextEvent();
                break;
        }
    }

    updateLipsync() {
        if (this.lipTimings.length > 0 && this.lipStartTime > 0) {
            let ms = performance.now() - this.lipStartTime;
            let pho = "_";
            for (let i = 0; i < this.lipTimings.length; i++) {
                if (ms < this.lipTimings[i][0]) break;
                pho = this.lipTimings[i][1];
            }
            let mouthSprite = PHONEME_TO_MOUTH[pho];
            if (this.sprite === 0 || this.sprite >= 142) {
                if (mouthSprite != null && mouthSprite !== -1) {
                    this.setSprite(mouthSprite);
                }
            }
        }
    }

    talk(text, say, { quote, french, msgid, xss } = {}) {
        if (say == null) say = text;
        this.stopSpeaking();
        this.bubble.hidden = false;
        text = text
            .replaceAll("{NAME}", nisolate(this.userPublic.name.replaceAll("$", "$$")))
            .replaceAll("{COLOR}", this.color);
        if (say != null) {
            say = say
                .replaceAll("{NAME}", this.userPublic.name)
                .replaceAll("{COLOR}", this.color);
            say = markdownToSpeech(say, french);
        }

        if (french) {
            text = "{FRANCE} " + text;
            say = "[[_^_fr]] " + say;
        }

        // text = linkify(text);
        let quoteHTML = "";
        if (quote) {
            quoteHTML = `
                <blockquote>
                    ${markup(quote.text)}
                </blockquote>
                <font color="blue">@${nmarkup(quote.name)}</font>
            `;
            if (!say.startsWith("-")) say = `at ${markdownToSpeech(quote.name, french)}, ${say}`;
        }
        let html = `${quoteHTML}${text === "{TOPJEJ}" ? "<img src='./img/misc/topjej.png'>" : xss ? text : markup(text) }`;
        for (let word of wordBlacklist) {
            word = word.trim().toLowerCase();
            if (word.length === 0) continue;
            if (text.toLowerCase().includes(word)) {
                html = `This message was blacklisted. <button data-html="${sanitize(html)}" onclick="this.parentElement.innerHTML = this.getAttribute('data-html')">Show</button>`;
                say = "-";
                break;
            }
        }
        this.bubbleCont.innerHTML = html;

        // here marks the point where i fucking give up
        bonzilog(this.id, this.userPublic.name, html, this.color, text, quoteHTML !== "", msgid);

        if (!say.startsWith("-")) {
            speak.play(say, {
                "pitch": this.userPublic.pitch,
                "speed": this.userPublic.speed
            }, () => {
                if (!text.includes("||")) this.clearDialog();
            }, (source, lip) => {
                this.voiceSource = source;
                this.lipStartTime = performance.now();
                this.lipTimings = lip;
            }, this.abortController.signal);
        }
    }

    joke() { this.runEvent(this.data.event_list_joke); }

    fact() { this.runEvent(this.data.event_list_fact); }

    poll(id, text, options = ["Yes", "No"]) {
        this.runEvent([{ type: "poll", id, text, options }]);
    }

    #showPoll(id, text, options) {
        let poll = {
            id: id,
            title: text,
            options: options,
            votes: [],
        };
        for (let word of wordBlacklist) {
            word = word.trim().toLowerCase();
            if (word.length === 0) continue;
            if (text.toLowerCase().includes(word) || options.some(option => option.toLowerCase().includes(word))) {
                this.talk("(blacklisted poll)", "-");
                return;
            }
        }
        let element = createPoll(poll, { 
            onvote() {
                this.eventFrame = 1;
            }
        });
        this.bubbleCont.textContent = "";
        this.bubbleCont.appendChild(element);
        this.bubble.hidden = false;
        let element2 = createPoll(poll);
        let scrolled = chat_log_content.scrollHeight - chat_log_content.clientHeight - chat_log_content.scrollTop <= 1;
        bonzilog(this.id, this.userPublic.name, "", this.color, `(POLL) ${text}`, true);
        chat_log_content.lastChild.querySelector(".log_message_content").appendChild(element2);
        if (scrolled) {
            chat_log_content.scrollTop = chat_log_content.scrollHeight;
        }
        speak.play(markdownToSpeech(text), {
            "pitch": this.userPublic.pitch,
            "speed": this.userPublic.speed
        }, () => { }, (source, lip) => {
            this.voiceSource = source;
            this.lipStartTime = performance.now();
            this.lipTimings = lip;
        }, this.abortController.signal);
    }

    image(url, msgid) {
        this.runEvent([{ type: "image", url, msgid }]);
    }

    #showImage(url, msgid) {
        this.#mediaReady = false;
        let image = new Image();
        image.src = url;
        image.onload = () => {
            let html = `<img src="${sanitize(url)}" class="userimage" crossorigin="anonymous">`;
            if (localStorage.hideImages === "true") {
                html = `This image is hidden. <button data-html="${sanitize(html)}" onclick="this.parentElement.innerHTML = this.getAttribute('data-html')">Show</button>`;
            }
            this.bubbleCont.innerHTML = html;
            this.bubble.hidden = false;
            this.#mediaReady = true;
            bonzilog(this.id, this.userPublic.name, html, this.color, `(IMAGE)`, false, msgid);
        };
    }

    video(url, msgid) {
        this.runEvent([{ type: "video", url, msgid }]);
    }

    #showVideo(url, msgid) {
        this.#mediaReady = false;
        let video = document.createElement("video");
        video.src = url;
        video.onloadeddata = () => {
            this.#mediaReady = true;
        };
        let html = `<video class="uservideo" controls><source src="${sanitize(url)}" crossorigin="anonymous"></video>`;
        if (localStorage.hideImages === "true") {
            html = `This video is hidden. <button data-html="${sanitize(html)}" onclick="this.parentElement.innerHTML = this.getAttribute('data-html')">Show</button>`;
        }
        this.bubbleCont.innerHTML = html;
        this.bubble.hidden = false;
        bonzilog(this.id, this.userPublic.name, html, this.color, `(VIDEO)`, false, msgid);
    }

    exit() {
        if (this.leaving) return;
        this.leaving = true;
        this.runEvent([{
            type: "anim",
            anim: "surf_away",
            ticks: 30
        }]);
        setTimeout(() => {
            this.deconstruct();
            bonzis.delete(this.id);
        }, 2000);
    }

    deconstruct() {
        this.stopSpeaking();
        if (dragged === this) {
            dragged = null;
        }
        this.element.remove();
    }

    updateName() {
        let typing = "";
        
        if (this.mute) {
            typing = " (muted)";
        } else if (this.userPublic.typing) {
            typing = ` (${this.userPublic.typing})`;
        };
        this.nametag.innerHTML = nmarkup(this.userPublic.name) + "" + typing;
    }

    updateTag() {
        this.tag.innerHTML = nmarkup(this.userPublic.tag);
    }

    backflip(swag) {
        var event = [{
            type: "anim",
            anim: "backflip",
            ticks: 15
        }];
        if (swag) {
            event.push({
                type: "anim",
                anim: "cool_fwd",
                ticks: 30
            });
            event.push({
                type: "idle"
            });
        }
        this.runEvent(event);
    }

    updateDialog() {
        let max = this.maxCoords();
        this.bubble.classList.remove("bubble-top");
        this.bubble.classList.remove("bubble-left");
        this.bubble.classList.remove("bubble-right");
        this.bubble.classList.remove("bubble-bottom");
        let bubbleRect = this.bubble.getBoundingClientRect();
        if (this.data.size.x + bubbleRect.width > max.x) {
            if (this.y < innerHeight / 2 - this.data.size.x / 2) {
                this.bubble.classList.add("bubble-bottom");
            } else {
                this.bubble.classList.add("bubble-top");
            }
        } else {
            if (this.x < innerWidth / 2 - this.data.size.x / 2) {
                this.bubble.classList.add("bubble-right");
            } else {
                this.bubble.classList.add("bubble-left");
            }
        }
    }

    minCoords() {
        return {
            x: chat_log.getBoundingClientRect().width || 0,
            y: 0,
        };
    }

    maxCoords() {
        return {
            x: innerWidth - this.data.size.x,
            y: innerHeight - this.data.size.y - chat_bar.getBoundingClientRect().height,
        };
    }

    asshole(target) {
        this.runEvent(
            [{
                type: "text",
                text: `Hey, ${nisolate(target)}!`
            }, {
                type: "text",
                text: "You're a fucking asshole!",
                say: "your a fucking asshole!"
            }, {
                type: "anim",
                anim: "grin_fwd",
                ticks: 15
            }]
        );
    }

    owo(target) {
        this.runEvent(
            [{
                type: "text",
                text: `*notices ${nisolate(target)}'s BonziBulge™*`,
                say: `notices ${target}s bonzibulge`
            }, {
                type: "text",
                text: "owo, wat dis?",
                say: "oh woah, what diss?"
            }]
        );
    }

    updateSprite() {
        this.cancel();
        this.element.style.backgroundImage = this.toBgImg();
        this.hatLayer.style.backgroundImage = toHatImg(this.color);
        this.move();
    }

    explode() {
        let explosion = document.createElement("div");
        explosion.className = "explosion";
        explosion.style.left = this.x + "px";
        explosion.style.top = this.y + "px";
        document.body.appendChild(explosion);
        this.element.style.zIndex = "999999"; // show above chat log
        let sfx = new Audio("./explosion.mp3");
        sfx.play();
        let rot = 0;
        let x = 0;
        let y = 0;
        let angvel = Math.random() * 30 + 20;
        if (Math.random() > 0.5) angvel *= -1;
        let xvel = Math.random() * 10 + 5;
        if (Math.random() > 0.5) xvel *= -1;
        let yvel = -20;
        let i = 0;
        let interval = setInterval(() => {
            i++;
            yvel += 2;
            x += xvel;
            rot += angvel;
            y += yvel;
            this.element.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
            if (i > 120) {
                clearInterval(interval);
                explosion.remove();
            }
        }, 33)
    }

    shuffle() {
        let maxCoords = this.maxCoords();
        let minCoords = this.minCoords();
        this.x = minCoords.x + (maxCoords.x - minCoords.x) * Math.random();
        this.y = minCoords.y + (maxCoords.y - minCoords.y) * Math.random();
        this.move();
    }
}

window.onresize = () => {
    for (let bonzi of bonzis.values()) {
        bonzi.move();
    }
};

chat_log_resize.onpointerdown = (e) => {
    chatLogDragged = true;
    dragX = e.pageX - chat_log_resize.getBoundingClientRect().left;
};

const NORTH = 0;
const SOUTH = 1;
const EAST = 0;
const WEST = 1;

window.onpointermove = (e) => {
    if (dragged) {
        dragged.move(e.pageX - dragX, e.pageY - dragY);
    }
    if (chatLogDragged) {
        window.onresize();
        chat_log.style.width = `${e.pageX - dragX}px`;
    }
    if (resizing) {
        let dx = e.pageX - resizeStartX;
        let dy = e.pageY - resizeStartY;
        let { dialog, handle } = resizing;
        let newWidth = resizeStartWidth;
        let newHeight = resizeStartHeight;

        if (handle.includes("n")) {
            newHeight = resizeStartHeight - dy;
        }
        if (handle.includes("s")) {
            newHeight = resizeStartHeight + dy;
        }
        if (handle.includes("e")) {
            newWidth = resizeStartWidth + dx;
        }
        if (handle.includes("w")) {
            newWidth = resizeStartWidth - dx;
        }

        dialog.resize(newWidth, newHeight, {
            vertical: handle.includes("n") ? NORTH : SOUTH,
            horizontal: handle.includes("e") ? EAST : WEST,
        });
    }
};

window.onpointerup = () => {
    dragged = null;
    chatLogDragged = false;
    resizing = null;
};

btn_tile.onclick = () => {
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let minY = 0;
    let addY = 80;
    let x = 0, y = 0;
    for (let bonzi of bonzis.values()) {
        bonzi.move(x, y);

        x += 200;
        if (x + 100 > winWidth) {
            x = 0;
            y += 160;
            if (y + 160 > winHeight) {
                minY += addY;
                addY /= 2;
                y = minY;
            }
        }
    }
};

function bonzisCheck() {
    let safeBonzis = new Set;
    for (let [key, public] of usersPublic.entries()) {
        if (!bonzis.has(key)) {
            let bonzi = new Bonzi(key, public);
            bonzis.set(key, bonzi);
            safeBonzis.add(bonzi);
            if (logJoins) {
                let msg = `${nmarkup(public.name)} has joined.`;
                bonzilog("server", "", msg, null, msg, true);
            }
        } else {
            let bonzi = bonzis.get(key);
            let oldName = bonzi.userPublic.name;
            let oldTyping = bonzi.userPublic.typing;
            bonzi.userPublic = public;
            if (oldName !== public.name) {
                let msg = `${nisolate(oldName)} is now known as ${nisolate(public.name)}.`;
                bonzilog("server", "", markup(msg), null, msg, true)
            }   
            if (oldTyping !== public.typing || oldName !== public.name) {
                bonzi.updateName();
            }
            bonzi.updateTag();
            if (bonzi.color != public.color) {
                bonzi.color = public.color;
                bonzi.updateSprite();
            }
            safeBonzis.add(bonzi);
        }
        if (key === me) {
            start_menu_name.value = public.name;
            start_menu_pfp.style.backgroundImage = public.color.split(" ").map(color => `url("/img/pfp/${color}.webp")`).reverse().join(", ");
            for (let preview of document.getElementsByClassName("preview")) {
                preview.style.backgroundImage = public.color.split(" ").map(color => `url("/img/bonzi/${color}.webp")`).reverse().join(", ");
            }
        }
    }
    usercount.innerText = usersPublic.size;
    for (let bonzi of bonzis.values()) {
        if (!safeBonzis.has(bonzi)) {
            bonzi.exit();
        }
    }

};

setInterval(() => {
    for (let bonzi of bonzis.values()) {
        bonzi.update();
    }
}, 66.67);

let socket = io("//");

let usersPublic = new Map;
let bonzis = new Map;

login_name.value = localStorage.name || "";

function login() {
    socket.emit("login", {
        name: login_name.value,
        room: login_room.value,
    });
    localStorage.name = login_name.value;
    setup();
}

login_go.onclick = login;

login_room.value = window.location.hash.slice(1);

function loginOnEnter(e) {
    if (e.which == 13) login();
}

login_name.onkeypress = loginOnEnter;
login_room.onkeypress = loginOnEnter;

socket.on("ban", (data) => {
    autorejoin = false;
    page_ban.hidden = false;
    ban_reason.innerHTML = data.reason;
    ban_end.textContent = new Date(data.end).toString();
});

socket.on("kick", (data) => {
    autorejoin = false;
    page_kick.hidden = false;
    kick_reason.innerHTML = data.reason;
});

socket.on("kick2", (data) => {
    autorejoin = false;
    page_kick.hidden = false;
    kick_cont.querySelector("img").remove();
    kick_cont.querySelector("br").remove();
    kick_cont.querySelector("br").remove();
    kick_reason.innerHTML = data.reason;
});

socket.on("loginFail", (data) => {
    login_card.hidden = false;
    login_load.hidden = true;
    login_error.hidden = false;
    login_error.textContent = `Error: ${data.reason}`;
});

socket.on("disconnect", () => {
    errorFatal();
    logJoins = false;
    if (page_ban.hidden && page_kick.hidden) {
        socket.connect();
    }
});

let typingTimeout = 0;

function errorFatal() {
    if (blockerror) return;
    if (page_ban.hidden && page_kick.hidden) {
        page_error.hidden = false;
    }
}

function typing(bool) {
    if (bool) {
        if (!typingTimeout) {
            socket.emit("typing", 1);
        } else {
            clearTimeout(typingTimeout)
        }
        typingTimeout = setTimeout(() => {
            socket.emit("typing", 0);
            typingTimeout = 0;
        }, 2000);
    } else {
        if (typingTimeout) {
            socket.emit("typing", 0);
            clearTimeout(typingTimeout)
            typingTimeout = 0;
        }
    }
}

let joined = false;

function setup() {
    chat_send.onclick = sendInput;
    joined = true;


    chat_message.onkeypress = (e) => {
        if (e.which === 13) sendInput();
    };

    chat_message.oninput = () => {
        let value = chat_message.value;
        if (value.trim() === "") {
            typing(false);
        } else {
            typing(true);
        }
    };

    function lipsyncTimer() {
        for (let bonzi of bonzis.values()) {
            bonzi.updateLipsync();
        }
        requestAnimationFrame(lipsyncTimer);
    }

    lipsyncTimer();
}

socket.on("room", (data) => {
    page_error.hidden = true;
    room_owner.hidden = !data.isOwner;
    room_public.hidden = !data.isPublic;
    room_private.hidden = data.isPublic;
    room_id.textContent = data.room;
    me = data.you;
    for (let unlock of data.unlocks) {
        if (!unlocks.includes(unlock)) {
            unlocks.push(unlock);
        }
    }
});

socket.on("updateAll", (data) => {
    page_login.hidden = true;
    usersPublic.clear();
    for (let [id, user] of entries(data.usersPublic)) {
        usersPublic.set(id, user);
    }
    bonzisCheck();
    logJoins = true;
});

socket.on("update", (data) => {
    usersPublic.set(data.guid, data.userPublic);
    bonzisCheck();
});

socket.on("talk", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.runEvent([{
        type: "text",
        text: data.text,
        quote: data.quote,
        msgid: data.msgid,
    }]);
});

socket.on("joke", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.rng = new seedrandom(data.rng);
    bonzi.cancel();
    bonzi.joke();
});

socket.on("fact", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.rng = new seedrandom(data.rng);
    bonzi.fact();
});

socket.on("backflip", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.backflip(data.swag);
});

socket.on("asshole", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.asshole(data.target);
});

socket.on("owo", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.owo(data.target);
});

socket.on("triggered", function (data) {
    let bonzi = bonzis.get(data.guid);
    bonzi.runEvent(bonzi.data.event_list_triggered);
});

socket.on("linux", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.runEvent(bonzi.data.event_list_linux);
});

socket.on("pawn", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.runEvent(bonzi.data.event_list_pawn);
});

socket.on("leave", (data) => {
    if (usersPublic.get(data.guid)) {
        usersPublic.delete(data.guid);
        let bonzi = bonzis.get(data.guid);
        let msg = `${nmarkup(bonzi.userPublic.name)} has left.`;
        bonzilog("server", "", msg, null, msg, false);
        console.assert(bonzi != null, "I don't think this will print. If you ever see this PLEASE report it to me!");
        bonzi.exit();
    }
    bonzisCheck();
});

socket.on("poll", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.poll(data.poll, data.title, data.options);
});

socket.on("image", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.image(data.url, data.msgid);
});

socket.on("video", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.video(data.url, data.msgid);
});

socket.on("vote", (data) => {
    updatePoll(data.poll, data.guid, data.vote);
});

socket.on("french", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.runEvent([{
        type: "text",
        text: data.text,
        french: true
    }]);
    bonzi.runEvent([{
        type: "text",
        text: "{FRANCE} France is being fixed. Thanks for your understanding.",
        say: "France is being fixed. Thanks for your understanding.",
    }])
});
/*  /*f*/
socket.on("xss", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.runEvent([{
        type: "text",
        text: data.text,
        xss: true,
    }]);
});

socket.on("nuke", (data) => {
    let bonzi = bonzis.get(data.guid);
    bonzi.explode();
});

socket.on("delete", (data) => {
    for (let id of data.ids) {
        document.getElementById(`msg_${id}`)?.remove();
    }
});

function sendInput() {
    let text = chat_message.value;
    chat_message.value = "";
    typing(false);
    scope: if (text.length > 0) {
        if (quote) {
            socket.emit("talk", {
                text: text,
                quote: quote,
            });
        } else if (text[0] === "/") {
            let list = text.slice(1).split(" ");
            if (list[0] === "clear") {
                lastUser = "";
                chat_log_content.innerText = "";
            } else if (list[0] === "settings") {
                openSettings();
            } else if (list[0] === "sex" || list[0] === "dolphin") {
                dolphin();
            } else if (list[0] === "debug:bless") {
                blessedPopup();
            } else if (list[0] === "debug:loud") {
                setVolume(2);
            } else if (list[0] === "shuffle") {
                for (let bonzi of bonzis.values()) {
                    bonzi.shuffle();
                }
            } else if (list[0] === "vaporwave") {
                document.body.classList.add("vaporwave");
            } else if (list[0] === "unvaporwave") {
                document.body.classList.remove("vaporwave");
            } else {
                socket.emit("command", {
                    command: list[0],
					args: list.slice(1).join(" "),
                });
            }
        } else {
            socket.emit("talk", {
                text: text,
            });
        }
    }
    quote = null;
    talkcard.hidden = true;
}

chat_log_button.onclick = () => {
    chat_log_button.hidden = true;
    chat_log.hidden = false;
    window.onresize();
};

chat_log_close.onclick = () => {
    chat_log_button.hidden = false;
    chat_log.hidden = true;
};

socket.on("connect", () => {
    setTimeout(() => {
        if (joined) {
            socket.emit("login", {
                name: login_name.value,
                room: login_room.value,
            });
        }
    }, 500);
    setTimeout(() => {
        document.getElementById("login_load").hidden = true;
        document.getElementById("login_card").hidden = false;
    }, 50);
});

let resizing = null;
let resizeStartX = 0;
let resizeStartY = 0;
let resizeStartWidth = 0;
let resizeStartHeight = 0;
let resizeStartLeft = 0;
let resizeStartTop = 0;

class Dialog {
    x;
    y;
    width;
    height;
    minWidth;
    minHeight;
    onclose;
    element;
    bodyElement;
    closeElement;
    headerElement;
    
    constructor(opt = {}) {
        if (opt.title == null) opt.title = "Window";
        opt.width = opt.width || 400;
        this.x = opt.x || 0;
        this.y = opt.y || 0;
        this.width = opt.width;
        this.height = opt.height;
        this.minWidth = opt.minWidth || 100;
        this.minHeight = opt.minHeight || 50;
        this.onclose = opt.onclose || (() => {});
        this.element = document.createElement("div");
        if (opt.class) this.element.className = opt.class;
        this.element.classList.add("window");
        this.element.innerHTML = `
        <div class="window_header">
        ${sanitize(opt.title)}
        <div class="window_close"></div>
        </div>
        <div class="window_body">
        <div class="window_content${ opt.bodyClass ? ` ${opt.bodyClass}` : ""}">
        </div>
        </div>
        </div>
        ${ opt.resizable !== false ? `
            <div class="resize_nw"></div>
            <div class="resize_ne"></div>
            <div class="resize_sw"></div>
            <div class="resize_se"></div>
            <div class="resize_n"></div>
            <div class="resize_w"></div>
            <div class="resize_s"></div>
            <div class="resize_e"></div>
        ` : ""}
        `;
        this.move(this.x, this.y);
        this.closeElement = this.element.querySelector(".window_close");
        this.headerElement = this.element.querySelector(".window_header");
        this.bodyElement = this.element.querySelector(".window_content");
        this.element.style.position = "absolute";
        this.element.style.zIndex = lastZ++ + 9999;
        this.headerElement.onpointerdown = (e) => {
            dragged = this;
            dragX = e.pageX - this.x;
            dragY = e.pageY - this.y;
        };
        this.closeElement.onclick = () => {
            this.element.remove();
            this.onclose();
        };
        this.element.onpointerdown = () => {
            this.focus()
        };
        this.element.style.width = `${opt.width}px`;
        if(opt.height) this.element.style.height = `${opt.height}px`;
        this.bodyElement.innerHTML = opt.html ?? "";
        if (opt.resizable !== false) {
            const handles = ["nw", "ne", "sw", "se", "n", "w", "s", "e"];
            for (let handle of handles) {
                let el = this.element.querySelector(`.resize_${handle}`);
                el.onpointerdown = (e) => {
                    resizing = { dialog: this, handle };
                    resizeStartX = e.pageX;
                    resizeStartY = e.pageY;
                    resizeStartWidth = this.width;
                    resizeStartHeight = this.height;
                    resizeStartLeft = this.x;
                    resizeStartTop = this.y;
                };
            }
        }
        content.appendChild(this.element);
        if (!opt.height) {
            let height = this.element.getBoundingClientRect().height;
            this.height = height;
            this.element.style.height = `${this.height}px`;
        }
        if (opt.center) {
            this.move(window.innerWidth / 2 - this.width / 2, window.innerHeight / 2 - this.height / 2);
        }
    }
    move(x, y) {
        this.x = x;
        this.y = y;
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    resize(w, h, dir = {vertical: SOUTH, horizontal: EAST}) {
        w = Math.max(this.minWidth, w);
        h = Math.max(this.minHeight, h);
        if (dir.vertical === NORTH) {
            this.y -= h - this.height;
        }
        if (dir.horizontal === WEST) {
            this.x -= w - this.width;
        }
        this.width = w;
        this.height = h;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    focus() {
        this.element.style.zIndex = lastZ++ + 9999;
    }

    static alert(opt, cb = () => {}) {
        if (typeof opt === "string") opt = { text: opt };
        if (opt.text != null) opt.html = sanitize(opt.text);
        let dialog = new Dialog({
            width: 400,
            title: opt.title ?? "Alert",
            bodyClass: "alert_body",
            center: true,
            resizable: false,
            html: `
                <div style="display: flex; flex-direction: row; gap: 10px;">
                    <img src="/img/desktop/error.png" style="padding-left: 10px;" width="32" height="32">
                    <div class="alert_text">${opt.html}</div>
                </div>
                <div class="alert_button_row">
                    <button class="xp-button ok">OK</button>
                </div>
            `,
        });
		let ok = dialog.element.querySelector(".ok");
        ok.onclick = () => {
            dialog.element.remove();
            cb();
        };
		ok.focus();
        return dialog;
    }
}

let settingsDialog;
let wordBlacklist = [];
let customStyleEl = null;

const settings = {
    schema: {
        hideImages: {
            type: "boolean",
            default: false,
            xml: { tag: "hideImages", attr: "on" },
        },
        classicBg: {
            type: "boolean",
            default: false,
            xml: { tag: "classicBg", attr: "on" },
            onLoad: (value) => document.body.classList.toggle("classic", value),
        },
        legacyTTS: {
            type: "boolean",
            default: false,
            xml: { tag: "legacyTTS", attr: "on" },
        },
        volume: {
            type: "number",
            default: 90,
            min: 0,
            max: 100,
            xml: { tag: "volume", attr: "value" },
        },
        wordBlacklist: {
            type: "array",
            default: "[]",
            xml: { tag: "blacklist", items: "word" },
            onLoad: (value) => { wordBlacklist = value; },
        },
        customCSS: {
            type: "string",
            default: "",
            placeholder: "Enter custom CSS here",
            xml: { tag: "customCSS", cdata: true },
            onLoad: (value) => applyCustomCSS(value),
        },
    },
    layout: {
        general: {
            name: "General",
            settings: [
                {
                    key: "hideImages",
                    type: "checkbox",
                    label: "Hide Images",
                },
                {
                    key: "classicBg",
                    type: "checkbox",
                    label: "Classic Background Color",
                    onChange: (value) => document.body.classList.toggle("classic", value),
                },
                {
                    key: "legacyTTS",
                    type: "checkbox",
                    label: "Legacy TTS",
                    description: "The old TTS has no lipsyncing but will run faster on older devices. Requires a reboot.",
                    onChange: () => location.reload(),
                },
                {
                    key: "volume",
                    type: "range",
                    label: "Volume",
                    min: 0,
                    max: 100,
                    onChange: (value) => setVolume(value / 100),
                },
                { 
                    type: "html",
                    html: "Blacklist:"
                },
                {
                    key: "wordBlacklist",
                    type: "textarea",
                    placeholder: "Newline-separated list of blacklisted words.",
                    splitByLine: true,
                    onChange: (value) => { wordBlacklist = value; },
                },
            ],
        },
        css: {
            name: "CSS",
            settings: [
                {
                    type: "html",
                    html: "Enter custom <a href=\"https://developer.mozilla.org/en-US/docs/Web/CSS\" target=\"_blank\">CSS</a> here. Don't touch this if you \
                           don't know what you're doing, this can brick BonziWORLD."
                },
                {
                    key: "customCSS",
                    type: "textarea",
                    placeholder: "Enter custom CSS",
                    onChange: (value) => applyCustomCSS(value),
                },
                /*{
                    type: "html",
                    html: "<a href=\"https://bonzi.gay/extra/css_tutorial.html\">CSS tutorial</a>"
                },*/
            ],
        },
    },
    init(storage = localStorage) {
        for (let [key, setting] of entries(settings.schema)) {
            if (storage[key] == null) {
                storage[key] = setting.default;
            }
        }
    },
    load(storage = localStorage) {
        for (let [key, setting] of entries(settings.schema)) {
            try {
                setting.onLoad?.(settings.get(key, storage));
            } catch (err) {
                console.error(`Loading setting ${key} failed:`, err);
                localStorage[key] = setting.default;
                setting.onLoad?.(setting.default);
            }
        }
    },
    export(storage = localStorage) {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<settings>\n`;
        for (let [key, setting] of entries(settings.schema)) {
            if (!setting.xml) continue;
            if (setting.type === "boolean") {
                xml += `    <${setting.xml.tag} ${setting.xml.attr}="${storage[key] === "true"}"/>\n`;
            } else if (setting.type === "number") {
                xml += `    <${setting.xml.tag} ${setting.xml.attr}="${sanitize(storage[key])}"/>\n`;
            } else if (setting.type === "array") {
                let items = JSON.parse(storage[key] || "[]");
                if (items.length > 0) {
                    xml += `    <${setting.xml.tag}>\n`;
                    for (let item of items) {
                            xml += `        <${setting.xml.items}>${sanitize(item)}</${setting.xml.items}>\n`;
                    }
                    xml += `    </${setting.xml.tag}>\n`;
                }
            } else if (setting.type === "string") {
                xml += `    <${setting.xml.tag}><![CDATA[${storage[key].replace(/]]>/g, "]]]]><![CDATA[>")}]]></${setting.xml.tag}>\n`;
            } else {
                xml += `    <${setting.xml.tag}>${sanitize(storage[key])}</${setting.xml.tag}>\n`;
            }
        }
        xml += "</settings>";
        return xml;
    },
    import(xml, storage = localStorage) {
        let parser = new DOMParser();
        let settingsXML = parser.parseFromString(xml, "application/xml");
        let settings = settingsXML.documentElement;
        if (settingsXML.querySelector("parsererror")) {
            throw Error(`Parser error: ${settingsXML.querySelector("parsererror").textContent}`);
        } else if (settings.tagName !== "settings") {
            throw Error(`Root tag is <${settings.tagName}>, not <settings>`);
        }
        for (let [key, setting] of entries(settings.schema)) {
            if (!setting.xml) continue;
            if (!xpath(settingsXML, `./${setting.xml.tag}`)) {
                throw Error(`Missing <${setting.xml.tag}>`);
            }
            if (setting.type === "boolean") {
                storage[key] = xpath(settingsXML, `string(./${setting.xml.tag}/@${setting.xml.attr})`) === "true";
                setting.onChange?.(storage[key] === "true");
            } else if (setting.type === "number") {
                storage[key] = xpath(settingsXML, `string(./${setting.xml.tag}/@${setting.xml.attr})`);
                setting.onChange?.(storage[key]);
            } else if (setting.type === "array") {
                let items = [];
                for (let node of xpath(settingsXML, `./${setting.xml.tag}/${setting.xml.items}`)) {
                    items.push(node.textContent);
                }
                storage[key] = JSON.stringify(items);
                setting.onChange?.(items);
            } else if (setting.type === "string") {
                storage[key] = xpath(settingsXML, `string(./${setting.xml.tag})`);
                setting.onChange?.(storage[key]);
            }
        }
    },
    get(key, storage = localStorage) {
        let setting = settings.schema[key];
        if (setting.type === "boolean") {
            return storage[key] === "true";
        } else if (setting.type === "number") {
            return +storage[key];
        } else if (setting.type === "array") {
            return JSON.parse(storage[key]);
        } else if (setting.type === "string") {
            return storage[key];
        }
    },
    set(key, value, storage = localStorage) {
        let setting = settings.schema[key];
        if (setting.type === "boolean") {
            storage[key] = value ? "true" : "false";
        } else if (setting.type === "number") {
            storage[key] = value;
        } else if (setting.type === "array") {
            storage[key] = JSON.stringify(value);
        } else if (setting.type === "string") {
            storage[key] = value;
        }
    },
    render(el) {
        el.innerHTML = `
            <div class="hbox fill">
                <div class="settings_sidebar"></div>
                <div class="vbox fill" style="gap: 4px; padding: 4px;">
                    <div class="settings_content"></div>
                    <div class="button_row">
                        <button class="import">Import</button>
                        <button class="export">Export</button>
                    </div>
                </div>
            </div>
        `;
        let sidebar = document.querySelector(".settings_sidebar");
        let content = document.querySelector(".settings_content");
        for (let [categoryId, category] of entries(settings.layout)) {
            let cat = document.createElement("div");
            cat.classList.add("settings_category");
            cat.textContent = category.name;
            sidebar.appendChild(cat);
            if (categoryId === "general") cat.classList.add("selected");
            cat.addEventListener("click", () => {
                sidebar.querySelector(".selected").classList.remove("selected");
                cat.classList.add("selected");
                settings.renderCategory(content, categoryId);
            });
        }
        let exportButton = document.querySelector(".export");
        exportButton.addEventListener("click", () => {
            exportWindow();
        });
        let importButton = document.querySelector(".import");
        importButton.addEventListener("click", () => {
            importWindow();
        });
        settings.renderCategory(content, "general");
    },
    renderCategory(el, category) {
        el.innerHTML = "";
        let layout = settings.layout[category].settings;
        for (let i = 0; i < layout.length; i++) {
            let setting = layout[i];
            let key = setting.key;
            switch (setting.type) {
                case "checkbox": {
                    let label = document.createElement("label");
                    let input = document.createElement("input");
                    label.appendChild(input);
                    input.type = "checkbox";
                    input.checked = settings.get(key);
                    input.onchange = () => { 
                        settings.set(key, input.checked)
                        setting.onChange?.(input.checked);
                    };
                    label.appendChild(document.createTextNode(` ${setting.label}`));
                    el.appendChild(label);
                } break;
                case "range": {
                    let label = document.createElement("label");
                    label.appendChild(document.createTextNode(`${setting.label}: `));
                    let input = document.createElement("input");
                    input.style.verticalAlign = "middle"; 
                    label.appendChild(input);
                    input.type = "range";
                    input.min = setting.min;
                    input.max = setting.max;
                    input.value = settings.get(key);
                    input.onchange = () => { 
                        settings.set(key, input.value);
                        setting.onChange?.(input.value);
                    };
                    el.appendChild(label);
                } break;
                case "textarea": {
                    let textarea = document.createElement("textarea");
                    textarea.className = "settings_textarea";
                    textarea.placeholder = setting.placeholder;
                    if (setting.splitByLine) {
                        textarea.value = settings.get(key).join("\n");
                        textarea.onchange = () => { 
                            let lines = textarea.value.split("\n").map(w => w.trim()).filter(w => w.length > 0);
                            settings.set(key, lines);
                            setting.onChange?.(lines);
                        };
                    } else {
                        textarea.value = settings.get(key);
                        textarea.oninput = () => { 
                            settings.set(key, textarea.value);
                            setting.onChange?.(textarea.value);
                        };
                    }
                    el.appendChild(textarea);
                } break;
                case "html": {
                    let div = document.createElement("div");
                    div.innerHTML = setting.html;
                    el.appendChild(div);
                }
            }
            if (setting.description) {
                let small = document.createElement("small");
                small.textContent = setting.description;
                el.appendChild(small);
            }
        }
    }
};

function applyCustomCSS(css) {
    customStyle.textContent = css;
}

settings.init();
settings.load();

function xpath(el, expr) {
    let result = el.getRootNode().evaluate(expr, el);
    switch (result.resultType) {
        case XPathResult.BOOLEAN_TYPE:
            return result.booleanValue;
        case XPathResult.NUMBER_TYPE:
            return result.numberValue;
        case XPathResult.STRING_TYPE:
            return result.stringValue;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
            let list = [];
            let node;
            while (node = result.iterateNext()) {
                list.push(node);
            }
            return list;
    }
}

function openSettings() {
    if (settingsDialog) {
        settingsDialog.element.remove();
    }
    settingsDialog = new Dialog({
        title: "Settings",
        class: "settings",
        width: 650,
        height: 420,
        x: 20,
        y: 20
    });
    settings.render(settingsDialog.bodyElement);
}

function exportWindow() {
    let dialog = new Dialog({
        title: "Export Settings",
        class: "export_window",
        html: `
            <textarea class="export fill" readonly></textarea>
        `,
        width: 400,
        height: 300,
        x: 100,
        y: 100
    });
    let element = dialog.element;
    let exportText = element.querySelector(".export");
    exportText.value = settings.export();
    exportText.focus();
}

function importWindow() {
    let dialog = new Dialog({
        title: "Import Settings",
        class: "import_window",
        html: `
            <textarea class="import fill" placeholder="Paste your settings here."></textarea>
            <div class="button_row">
                <button class="import_button">Import</button>
            </div>
        `,
        width: 400,
        height: 300,
        x: 100,
        y: 100
    });
    let element = dialog.element;
    let importText = element.querySelector(".import");
    importText.focus();
    element.querySelector(".window_close").onclick = () => {
        dialog.element.remove();
    }
    element.querySelector(".import_button").onclick = () => {
        let text = importText.value;
        try {
            let lastX = settingsDialog.x;
            let lastY = settingsDialog.y;
            settings.import(text);
            openSettings();
            settingsDialog.move(lastX, lastY);
        } catch (err) {
            Dialog.alert({ 
                html: markup(err.message)
            });
        }
    }
}

async function dolphin() {
    if (!gravity) {
        let script = document.createElement("script");
        script.async = true;
        script.src = "./lib/jGravity.js";
        gravity = true;
        script.onload = () => {
            $("#content").jGravity({
                target: ".bonzi",
                depth: Infinity,
            });
        }
        document.head.appendChild(script);
    }
}

function cmd(str) {
	let [command, ...args] = str.split(" ");
    socket.emit("command", {
		command,
		args: args.join(" "),
	});
}

function blessedPopup() {
    return new Dialog({
        title: "Blessmode",
        class: "flex_window",
        html: `
            <div class="blessed_body">
                <h1><marquee>YOU'VE BEEN BLESSED!</marquee></h1>
                Blessed is a VIP-like status given to users who I like.<br>
                You now have access to:<br>
                <ul>
                    <li> <b>Mutlihatting</b>: Use the /hat command with up to 3 hats. Try <var>/hat dank tophat</var>.
                    <li> <b>Skins:</b> 4 custom skins
                    <li> <b>Hats:</b> 4 extra hats
                </ul>
                <h3>Skins</h3>
                <div class="roulette">
                    <div class="card angel" onclick="cmd('angel')"></div>
                    <div class="card glow" onclick="cmd('glow')"></div>
                    <div class="card noob" onclick="cmd('noob')"></div>
                    <div class="card gold" onclick="cmd('gold')"></div>
                </div>
                <h3>Hats</h3>
                <div class="roulette">
                    <div class="cardhat dank" onclick="cmd('hat dank')"></div>
                    <div class="cardhat illuminati" onclick="cmd('hat illuminati')"></div>
                    <div class="cardhat cigar" onclick="cmd('hat cigar')"></div>
                    <div class="cardhat propeller" onclick="cmd('hat propeller')"></div>
                </div>
            </div>
        `,
        x: 300,
        y: 400,
        width: 600,
        height: 400,
    });
}

start_button.onclick = () => {
    start_menu.hidden = !start_menu.hidden;
};

function bonziEditorPopup() {
    let dialog = new Dialog({
        title: "Bonzi Editor",
        class: "flex_window bonzi_editor",
        html: `
            <div class="hbox fill">
                <div class="hats">
                    <h2>Colors</h1>
                    <div class="editor-grid color-grid"></div>
                    <h2>Hats</h1>
                    <div class="editor-grid hat-grid"></div>
                    <h2>Unlockable</h2>
                    <div class="editor-grid unlockable-grid"></div>
                </div>
                <div class="preview-container">
                    Preview
                    <div class="preview"></div>
                </div>
            </div>
        `,
        x: 200,
        y: 200,
        width: 600,
        height: 400,
    });
    let element = dialog.element;
    function itemElements(selector, itemArray, path, callback, { isLocked, tooltip } = {}) {
        let grid = element.querySelector(selector);
        for (let hat of itemArray) {
            let item = document.createElement("div");
            item.style.backgroundImage = `url("/${path}/${hat}.webp")`;
            item.className = "editor-item";
            if (isLocked?.(hat)) item.classList.add("locked-item");
            item.setAttribute("data-tooltip", tooltip?.(hat) ?? hat);
            item.setAttribute("data-hat", hat);
            item.onclick = () => {
                callback(hat);
            };
            grid.appendChild(item);
        }
    }
    itemElements(".color-grid", BonziData.colors.normal, "img/pfp", (hat) => cmd(`color ${hat}`));
    itemElements(".hat-grid", BonziData.hats.normal, "img/haticon", (hat) => cmd(`hat ${hat}`));
    itemElements(".unlockable-grid", BonziData.hats.vault, "img/haticon", (hat) => cmd(`hat ${hat}`), {
        isLocked: (hat) => !unlocks.includes(hat),
        tooltip: (hat) => `${hat}\nUnlocked in the vault`,
    });
    itemElements(".unlockable-grid", BonziData.hats.event.filter(hat => unlocks.includes(hat)), "img/haticon", (hat) => cmd(`hat ${hat}`), {
        tooltip: (hat) => `${hat}\nUnlocked in the 2026 April Fools event`,
    });
    let preview = element.querySelector(".preview");
    preview.style.backgroundImage = bonzis.get(me).color.split(" ").map(color => `url("/img/bonzi/${color}.webp")`).reverse().join(", ");
}

start_menu_pfp.onclick = () => {
    start_menu.hidden = true;
    bonziEditorPopup();
};

start_menu_name.onkeyup = (e) => {
    if (e.key === "Enter") {
        cmd(`name ${start_menu_name.value}`);
    }
};

start_menu_name.onblur = () => {
    cmd(`name ${start_menu_name.value}`);
};

settings_button.onclick = () => {
    start_menu.hidden = true;
    openSettings();
};

function pollCreatorPopup() {
    let dialog = new Dialog({
        title: "Poll Creator",
        class: "flex_window poll_creator",
        x: 150,
        y: 100,
        width: 300,
        height: 375,
        resizable: false,
        html: `
            <div class="poll-creator-body">
                <textarea class="poll-title" placeholder="Ask a question" maxlength="1000"></textarea>
                <hr>
                Options:
                <div class="poll-options"></div>
                <div class="poll-buttons">
                    <button class="xp-button add-option">Add Option</button>
                    <button class="xp-button create-poll">Create Poll</button>
                </div>
            </div>
        `,
    });
    let element = dialog.element;
    let optionsContainer = element.querySelector(".poll-options");
    let addOptionButton = element.querySelector(".add-option");
    let options = [];

    function addOption() {
        if (options.length >= 5) return;
        let optionRow = document.createElement("div");
        optionRow.className = "poll-option-row";
        optionRow.innerHTML = `
        <input type="text" placeholder="Option ${options.length + 1}" maxlength="50">
        <button class="xp-button delete-option">X</button>
        `;
        optionRow.querySelector(".delete-option").onclick = () => {
            if (optionsContainer.children.length > 2) {
                optionRow.remove();
                options.splice(options.indexOf(optionRow), 1);
                updatePoll();
            }
        };
        options.push(optionRow);
        optionsContainer.appendChild(optionRow);
        updatePoll();
    }

    function updatePoll() {
        for(let i = 0; i < options.length; i++) {
            options[i].querySelector("input").placeholder = `Option ${i + 1}`;
        }
        for (let el of element.querySelectorAll(".delete-option")) {
            el.disabled = options.length <= 2;
        }
        addOptionButton.disabled = options.length >= 5;
    }

    addOption();
    addOption();

    addOptionButton.onclick = () => {
        if (options.length < 5) addOption();
    };

    element.querySelector(".create-poll").onclick = () => {
        let title = element.querySelector(".poll-title").value.trim();
        let options = [...optionsContainer.querySelectorAll("input")]
            .map(input => input.value.trim())
            .filter(val => val.length > 0);
        cmd(`advpoll ${title.replace(/[;\\]/g, "\\$&")};${options.map(option => option.replace(/[;\\]/g, "\\$&")).join(";")}`);
        dialog.element.remove();
    };
}

poll_button.onclick = () => {
    start_menu.hidden = true;
    pollCreatorPopup();
};

function uploadPopup(initialFile) {
    let blobUrl = null;
    let dialog = new Dialog({
        title: "Upload",
        class: "flex_window",
        x: 20,
        y: 50,
        width: 400,
        height: 300,
        html: `
            <div class="upload_dropzone"></div>
            <div style="height: 2px;"></div>
            <input type="file" accept="image/*" class="upload_input" hidden>
            <div class="upload_buttons">
                <div class="fill"><img src="/img/misc/logo.png" class="upload_icon"> Powered by <a href="https://catbox.moe">Catbox</a></div>
                <button class="xp-button upload_button" disabled>Upload</button>
            </div>
        `,
        onclose: () => {
            if (blobUrl) URL.revokeObjectURL(blobUrl);
        },
    });
    let element = dialog.element;
    let dropzone = element.querySelector(".upload_dropzone");
    let button = element.querySelector(".upload_button");
    let fileInput = element.querySelector(".upload_input");
    let blob = null;

    function loadFile(file) {
        if (!file) return;
        blob = file;
        if (blobUrl) URL.revokeObjectURL(blobUrl);
        blobUrl = URL.createObjectURL(blob);
        dropzone.style.background = `url("${blobUrl}") center center / contain no-repeat`;
        button.disabled = false;
    }

    if (initialFile) loadFile(initialFile);

    dropzone.onclick = () => fileInput.click();
    fileInput.onchange = () => loadFile(fileInput.files[0]);

    dropzone.ondragover = (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "#003c74";
    };

    dropzone.ondragleave = () => {
        dropzone.style.borderColor = "";
    };

    dropzone.ondrop = (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "";
        loadFile(e.dataTransfer.files[0]);
    };
    button.onclick = async () => {
        if (!blobUrl) return;
        let formData = new FormData();
        formData.append("reqtype", "fileupload");
        formData.append("fileToUpload", blob);
        formData.append("time", "1h");
        let response = await fetch("https://litterbox.catbox.moe/resources/internals/api.php", {
            method: "POST",
            body: formData,
        });
        let url = await response.text();
        console.log(url);
        cmd(`img ${url}`);
        dialog.element.remove();
    };
}

image_button.onclick = () => {
    start_menu.hidden = true;
    uploadPopup();
};

document.onpaste = (e) => {
    let items = e.clipboardData.items;
    for (let item of items) {
        if (item.type.includes("image")) {
            e.preventDefault();
            let file = item.getAsFile();
            uploadPopup(file);
            break;
        }
    }
};

function vaultPopup() {
    let dialog = new Dialog({
        title: "THE VAULT",
        class: "flex_window no_padding_window",
        x: 10,
        y: 10,
        width: 700,
        height: 500,
        html: `
            <div class="vault-body">
                <audio autoplay src="/vault.mp3" loop hidden></audio>
                <div class="vault-message">Maybe I should've hidden this room better...</div>
                <input class="vault-input">
                <div class="vault-keeper-container">
                    <div class="vault-keeper">
                        <img src="/img/misc/sparkybuddy.webp">
                    </div>
                </div>
            </div>
        `,
    });
    let element = dialog.element;
    let input = element.querySelector(".vault-input");
    let button = element.querySelector(".vault-keeper");
    let label = element.querySelector(".vault-message");
    let tag = null;
    button.onclick = async () => {
        let guess = input.value;
        input.value = "";
        let response = await fetch("/vault", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ guess, tag }),
        });
        let json = await response.json();
        tag = json.tag;
        label.innerHTML = json.message;
        if (json.unlock && !unlocks.includes(json.unlock)) {
            unlocks.push(json.unlock);
            for (let item of document.getElementsByClassName("locked-item")) {
                if (item.getAttribute("data-hat") === json.unlock) {
                    item.classList.remove("locked-item");
                }
            }
        }
    };
    input.onkeydown = (e) => {
        if (e.key === "Enter") button.onclick();
    };
}

start_menu_vault.onclick = () => {
    vaultPopup();
    start_menu.hidden = true;
};

socket.on("blessed", blessedPopup);
socket.on("king", () => king = true);
socket.on("admin", () => admin = true);
socket.on("nuked", () => setTimeout(() => { blockerror = true; location.reload() }, 4000));
socket.on("alert", (data) => {
    Dialog.alert(data);
});

socket.on("unlock", (data) => {
    if (!unlocks.includes(data.hat)) {
        unlocks.push(data.hat);
        for (let item of document.getElementsByClassName("locked-item")) {
            if (item.getAttribute("data-hat") === data.hat) {
                item.classList.remove("locked-item");
            }
        }
    }
    Dialog.alert(`You unlocked the "${data.hat}" hat!`);
});

function resetRainbow(el) {
    for (let anim of el.getAnimations()) {
        if (anim.animationName === "move") anim.startTime = 0;
    }
}

const rainbowSelector = "gay-rainbow,gay-spoiler,code"; // can have anims

const observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
            if (!(node instanceof Element)) continue;

            if (node.matches(rainbowSelector)) {
                resetRainbow(node);
            }

            node.querySelectorAll(rainbowSelector).forEach(resetRainbow);
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });

document.body.onmouseover = (e) => {
    let el = e.target.closest("[data-tooltip]");
    if (el) {
        let tooltip = document.getElementById("tooltip");
        tooltip.innerText = el.getAttribute("data-tooltip");
        tooltip.style.display = "block";
        tooltip.style.left = (e.clientX + 10) + "px";
        tooltip.style.top = (e.clientY + 10) + "px";
    }
};

document.body.onmousemove = (e) => {
    let tooltip = document.getElementById("tooltip");
    if (tooltip.style.display !== "none") {
        tooltip.style.left = (e.clientX + 10) + "px";
        tooltip.style.top = (e.clientY + 10) + "px";
    }
};

document.body.onmouseout = (e) => {
    let el = e.target.closest("[data-tooltip]");
    if (el) {
        document.getElementById("tooltip").style.display = "none";
    }
};

document.body.onclick = (e) => {
    if (!e.target.closest("#start_menu, #start_button")) {
        start_menu.hidden = true;
    }
};