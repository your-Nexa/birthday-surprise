document.addEventListener("DOMContentLoaded", function () {

    const moonButton = document.getElementById("moonButton");
    const moon = document.getElementById("moon");
    const intro = document.getElementById("intro");
    const wishArea = document.getElementById("wishArea");
    const shootingStar = document.getElementById("shootingStar");
    const sendWish = document.getElementById("sendWish");
    const skipWish = document.getElementById("skipWish");
    const wishInput = document.getElementById("wishInput");
    const result = document.getElementById("result");
    const resultHeading = document.getElementById("resultHeading");
    const starInstruction = document.getElementById("starInstruction");
    const wishText = document.getElementById("wishText");
    const wishPopup = document.getElementById("wishPopup");
    const closeWish = document.getElementById("closeWish");
    const nextButton = document.getElementById("nextButton");
    const wishStar = document.getElementById("wishStar");
    const magicParticles = document.getElementById("magicParticles");

    function openWishPage() {
        if (!wishArea.hidden) return;

        intro.hidden = true;
        wishArea.hidden = false;

        shootingStar.classList.remove("fly");
        void shootingStar.offsetWidth;
        shootingStar.classList.add("fly");
    }

    moonButton.addEventListener("click", openWishPage);
    moon.addEventListener("click", openWishPage);

    function celebrate() {
        document.body.classList.add("wish-complete");

        const symbols = ["✨", "💖", "⭐", "🌸", "💫", "🤍"];

        for (let i = 0; i < 55; i++) {
            const particle = document.createElement("span");

            particle.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            particle.style.left = Math.random() * 100 + "%";
            particle.style.setProperty(
                "--duration",
                (3 + Math.random() * 4) + "s"
            );
            particle.style.setProperty(
                "--delay",
                (Math.random() * 2) + "s"
            );
            particle.style.setProperty(
                "--drift",
                (Math.random() * 180 - 90) + "px"
            );

            magicParticles.appendChild(particle);
        }

        setTimeout(() => {
            magicParticles.innerHTML = "";
        }, 8000);
    }

    // Show result after Send or Skip
    function showResult(wish) {

        wishArea.hidden = true;
        result.hidden = false;
        wishPopup.hidden = true;

        if (wish) {

            // Save wish
            localStorage.setItem("anamikaWish", wish);

            wishText.textContent = "“" + wish + "”";

            resultHeading.textContent =
                "Your Wish Is In The Stars ✨";

            starInstruction.hidden = false;
            wishStar.hidden = false;

        } else {

            // Skip without saving a new wish
            resultHeading.textContent =
                "A Little Surprise Awaits ✨";

            starInstruction.hidden = true;
            wishStar.hidden = true;

        }

        celebrate();
    }

    // Send button
    sendWish.addEventListener("click", function () {

        const wish = wishInput.value.trim();

        if (!wish) {
            wishInput.placeholder =
                "প্রথমে তোমার ইচ্ছেটা লিখো... 💗";

            wishInput.focus();
            return;
        }

        showResult(wish);
    });

    // Skip button
    skipWish.addEventListener("click", function () {
        showResult("");
    });

    // Open wish popup by clicking star
    wishStar.addEventListener("click", function () {
        wishPopup.hidden = false;
    });

    // Close wish popup
    closeWish.addEventListener("click", function () {
        wishPopup.hidden = true;
    });

    // One Last Surprise button
    nextButton.addEventListener("click", function () {
        window.location.href = "birthday.html";
    });

});
