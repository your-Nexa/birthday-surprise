function checkPassword() {

    const passwordInput = document.getElementById("password");
    const message = document.getElementById("message");
    const button = document.getElementById("unlockButton");

    const input = passwordInput.value
        .trim()
        .toLowerCase()
        .replace(/[\s\p{P}\p{S}]+/gu, "");

    const correctPasswords = ["ruhi", "রুহি"];

    if (!correctPasswords.includes(input)) {
        message.style.color = "#ff6961";
        message.innerHTML =
            "🥺 পাসওয়ার্ডটি ঠিক হয়নি। আরেকবার মনে করার চেষ্টা করো। ❤️";
        passwordInput.value = "";
        passwordInput.focus();
        return;
    }

    message.style.color = "#ffb6c1";
    message.innerHTML = "❤️ ধন্যবাদ মনে রাখার জন্য। 🥺";

    passwordInput.disabled = true;
    button.disabled = true;

    setTimeout(() => {

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

    }, 2500);
}

const passwordInput = document.getElementById("password");

if (passwordInput) {
    passwordInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkPassword();
        }
    });
}
