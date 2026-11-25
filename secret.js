let wrongAttempts = 0;

function showPopup(title, content, callback) {
    const old = document.getElementById("passwordPopup");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.id = "passwordPopup";
    overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,.75);
        display:flex;justify-content:center;align-items:center;
        z-index:99999;padding:18px;
    `;

    const box = document.createElement("div");
    box.style.cssText = `
        width:100%;max-width:340px;max-height:85vh;overflow-y:auto;
        background:linear-gradient(145deg,#fff0f6,#f5d9ee);
        border-radius:22px;padding:24px 20px;text-align:center;
        box-shadow:0 10px 40px rgba(0,0,0,.4);
        animation:popupShow .3s ease;
    `;

    box.innerHTML = `
        <style>
        @keyframes popupShow {
            from {transform:scale(.75);opacity:0}
            to {transform:scale(1);opacity:1}
        }
        </style>
        <div style="font-size:34px;margin-bottom:10px">💗</div>
        <h2 style="color:#b83280;margin:0 0 14px">${title}</h2>
        <div style="color:#663355;font-size:16px;line-height:1.8">
            ${content}
        </div>
        <button id="popupOK" style="
            margin-top:22px;width:100%;border:0;border-radius:35px;
            padding:13px;background:linear-gradient(90deg,#ff4385,#e8329b);
            color:white;font-size:18px;font-weight:bold;
        ">OK ❤️</button>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById("popupOK").onclick = () => {
        overlay.remove();
        if (callback) callback();
    };
}

function openNameChoice() {
    const old = document.getElementById("passwordPopup");
    if (old) old.remove();

    const names = [
        "Mimi", "Riya", "Jaan", "Mitu",
        "Pori", "Tuli", "Sona", "Pakhi",
        "Mishti", "Nila", "Ruhi", "Tania"
    ];

    const overlay = document.createElement("div");
    overlay.id = "passwordPopup";
    overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,.78);
        display:flex;justify-content:center;align-items:center;
        z-index:99999;padding:18px;
    `;

    const box = document.createElement("div");
    box.style.cssText = `
        width:100%;max-width:340px;max-height:85vh;overflow-y:auto;
        background:linear-gradient(145deg,#fff0f6,#f5d9ee);
        border-radius:22px;padding:22px 18px;text-align:center;
        box-shadow:0 10px 40px rgba(0,0,0,.4);
    `;

    box.innerHTML = `
        <div style="font-size:34px">🥺💗</div>
        <h2 style="color:#b83280">শেষবার একটু মনে করো...</h2>
        <p style="color:#663355;line-height:1.7">
            নিচের নামগুলোর মধ্যে থেকে একটি বেছে নাও।
            কোন নামে আমি তোমাকে ডাকতাম?
        </p>
        <div id="nameOptions" style="
            display:grid;grid-template-columns:1fr 1fr;gap:10px;
            margin:18px 0;
        "></div>
        <p id="choiceError" style="color:#d32665"></p>
        <button id="chooseName" style="
            width:100%;border:0;border-radius:35px;padding:13px;
            background:linear-gradient(90deg,#ff4385,#e8329b);
            color:white;font-size:18px;font-weight:bold;
        ">এই নামটি বেছে নাও ❤️</button>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const area = box.querySelector("#nameOptions");

    names.forEach(name => {
        const label = document.createElement("label");
        label.style.cssText = `
            display:flex;align-items:center;justify-content:center;
            gap:6px;padding:12px 5px;border:2px solid #e7a6c8;
            border-radius:13px;background:#fff8fc;color:#74345d;
            font-size:17px;cursor:pointer;
        `;

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "chosenName";
        radio.value = name.toLowerCase();
        radio.style.accentColor = "#ff4385";

        const text = document.createElement("span");
        text.textContent = name;

        label.appendChild(radio);
        label.appendChild(text);
        area.appendChild(label);
    });

    box.querySelector("#chooseName").onclick = () => {
        const chosen = box.querySelector(
            'input[name="chosenName"]:checked'
        );

        if (!chosen) {
            box.querySelector("#choiceError").textContent =
                "🥺 আগে একটি নাম বেছে নাও।";
            return;
        }

        if (chosen.value === "ruhi") {
            overlay.remove();
            unlockGallery();
        } else {
            overlay.remove();
            showPopup(
                "এটাও কি সেই নাম নয়? 🥺",
                "আরেকবার ভালো করে মনে করার চেষ্টা করো। কিছু নাম কিন্তু সহজে ভোলার নয়। ❤️",
                openNameChoice
            );
        }
    };
}

function unlockGallery() {
    const passwordInput = document.getElementById("password");
    const button = document.getElementById("unlockButton");

    passwordInput.disabled = true;
    button.disabled = true;

    showPopup(
        "ধন্যবাদ মনে রাখার জন্য 🥺❤️",
        "সবকিছু হয়তো আগের মতো নেই, কিন্তু কিছু নাম আর কিছু স্মৃতি সহজে মুছে যায় না।<br><br>এই ছোট্ট নামটাকে এত সুন্দর একটা স্মৃতি করে রাখার জন্য ধন্যবাদ। ❤️",
        () => {
            const loading = document.getElementById("loadingScreen");
            loading.style.display = "flex";

            let percent = 0;
            const fill = document.getElementById("loaderFill");
            const text = document.getElementById("loaderText");

            const timer = setInterval(() => {
                percent++;

                if (fill) fill.style.width = percent + "%";
                if (text) text.innerHTML = percent + "%";

                if (percent >= 100) {
                    clearInterval(timer);
                    location.href = "gallery.html";
                }
            }, 25);
        }
    );
}

function checkPassword() {
    const passwordInput = document.getElementById("password");

    const input = passwordInput.value
        .trim()
        .toLowerCase()
        .replace(/[\s\p{P}\p{S}]+/gu, "");

    if (input === "ruhi" || input === "রুহি") {
        unlockGallery();
        return;
    }

    passwordInput.value = "";
    wrongAttempts++;

    if (wrongAttempts === 1) {
        showPopup(
            "একটু মনে করো... 🥺",
            "আচ্ছা, মনে পড়ছে না? এত সুন্দর একটা নাম, ভুলে গেলে নাকি?"
        );
    } else if (wrongAttempts === 2) {
        showPopup(
            "আরেকবার ভাবো ❤️",
            "একটু ভালো করে ভাবো... এই নামটা কিন্তু একসময় তোমার খুব আপন ছিল।"
        );
    } else {
        showPopup(
            "একটা পুরোনো স্মৃতি... 🥺",
            "থাক, আর কষ্ট করে মনে করতে হবে না। কিছু স্মৃতি হয়তো সময়ের সাথে ঝাপসা হয়ে যায়।<br><br>তোমাকে আমি যে নামে ডাকতাম, সেই নামটা কি মনে আছে?",
            openNameChoice
        );
    }
}

const passwordInput = document.getElementById("password");

if (passwordInput) {
    passwordInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") checkPassword();
    });
}
