function checkPassword(){

    const input = document.getElementById("password").value
        .trim().toLowerCase()
        .replace(/[\s\p{P}\p{S}]+/gu, "");

    const message = document.getElementById("message");
    const hint = document.getElementById("hint");

    const noAnswers = [
        "না", "নাই", "নাহ", "নানা",
        "na", "naa", "nah", "no", "nope"
    ];

    const yesAnswers = [
        "হ্যাঁ", "হ্যা", "হুম",
        "ha", "haa", "hmm", "yes", "yeah", "yup"
    ];

    let response = "";

    if(noAnswers.includes(input)){

        response = "❤️ আমি জানতাম তুমি না-ই বলবে। সমস্যা নেই, এখন ভিতরে আসো। 🌸";

    } else if(yesAnswers.includes(input)){

        response = "🥺 আমি জানতাম তুমি আমাকে ভালোবাসো। আমি এখনো তোমার অপেক্ষায় আছি। ফিরে এসো... ❤️";

    } else {

        message.style.color = "#ff6961";
        message.innerHTML = "🥺 দয়া করে হ্যাঁ অথবা না লিখে উত্তর দাও।";
        return;
    }

    message.style.color = "#ffb6c1";
    message.innerHTML = response;
    hint.innerHTML = "";

    document.getElementById("password").disabled = true;

    const button = document.querySelector(".lock-box button");
    if(button) button.disabled = true;

    // আগে মেসেজ দেখাবে
    setTimeout(() => {

        const loading = document.getElementById("loadingScreen");
        loading.style.display = "flex";

        let percent = 0;

        const fill = document.getElementById("loaderFill");
        const text = document.getElementById("loaderText");

        const timer = setInterval(() => {

            percent++;

            if(fill) fill.style.width = percent + "%";
            if(text) text.innerHTML = percent + "%";

            if(percent >= 100){

                clearInterval(timer);
                location.href = "gallery.html";

            }

        }, 25);

    }, 3500);
}

const passwordInput = document.getElementById("password");

if(passwordInput){
    passwordInput.addEventListener("keydown", function(event){
        if(event.key === "Enter"){
            checkPassword();
        }
    });
}
