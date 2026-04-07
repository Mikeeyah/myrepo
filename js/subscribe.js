const form = document.getElementById("newsletterForm");
const button = document.getElementById("submitBtn");
const message = document.getElementById("formMessage");
const errorMsg = document.getElementById("formError");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    // Reset UI
    message.classList.add("d-none");
    errorMsg.classList.add("d-none");

    // 🚫 Check if offline FIRST
    if (!navigator.onLine) {
        errorMsg.innerHTML = "❌ No internet connection.";
        errorMsg.classList.remove("d-none");
        return;
    }

    // Loading state
    button.disabled = true;
    button.innerHTML = "Sending...";

    const formData = new FormData(form);

    try {
        const response = await fetch("https://formgrid.dev/api/f/w17az8ha", {
            method: "POST",
            body: formData,
            mode: "no-cors" // 🔥 IMPORTANT FIX
        });

        // ✅ ALWAYS SUCCESS if no crash
        form.reset();
        message.classList.remove("d-none");

    } catch (error) {
        // ❌ Only real network failure reaches here
        errorMsg.innerHTML = "❌ Failed to send. Try again.";
        errorMsg.classList.remove("d-none");
    }

    // Reset button
    button.disabled = false;
    button.innerHTML = "Subscribe";
});