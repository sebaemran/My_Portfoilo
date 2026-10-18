const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeButton.textContent = isDark
        ? "Light Theme"
        : "Dark Theme";

    localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
    );
});

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent = "Light Theme";
}

emailjs.init({
    publicKey: "iEYU54Kas0188Bk71"
});

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
        'button[type="submit"], input[type="submit"]'
    );

    const originalText = submitButton
        ? (submitButton.tagName === "INPUT"
            ? submitButton.value
            : submitButton.textContent)
        : "";

    if (submitButton) {
        submitButton.disabled = true;

        if (submitButton.tagName === "INPUT") {
            submitButton.value = "Sending...";
        } else {
            submitButton.textContent = "Sending...";
        }
    }

    emailjs.sendForm(
        "service_nrhy0xl",
        "template_evqcu5c",
        contactForm
    )
    .then(function () {
        alert("Your message has been sent successfully!");
        contactForm.reset();
    })
    .catch(function (error) {
        console.error("EmailJS error:", error);
        alert("Failed to send your message. Please try again.");
    })
    .finally(function () {
        if (submitButton) {
            submitButton.disabled = false;

            if (submitButton.tagName === "INPUT") {
                submitButton.value = originalText;
            } else {
                submitButton.textContent = originalText;
            }
        }
    });
});