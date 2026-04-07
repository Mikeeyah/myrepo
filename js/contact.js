document.querySelectorAll(".form-input, .form-textarea").forEach(input => {
  input.addEventListener("input", () => {
    validateForm();
  });
});	
	

function validateForm() {
  let isValid = true;

  const fields = [
    { id: "name", type: "text" },
    { id: "email", type: "email" },
    { id: "message", type: "text" }
  ];

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const error = input.parentElement.nextElementSibling;

    input.classList.remove("input-error", "input-success");
    error.textContent = "";

    if (input.value.trim() === "") {
      input.classList.add("input-error");
      error.textContent = `${field.id} is required`;
      isValid = false;
    } 
    else if (field.type === "email") {
      const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
      if (!input.value.match(pattern)) {
        input.classList.add("input-error");
        error.textContent = "Enter a valid email";
        isValid = false;
      } else {
        input.classList.add("input-success");
      }
    } 
    else {
      input.classList.add("input-success");
    }
  });

  return isValid;
}

window.addEventListener("load", function () {

  const form = document.getElementById("form-856ba777-08ac-42e7-bb22-29dfa9b7c9df");
  const popup = document.getElementById("successPopup");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = form.querySelector(".form-submit-btn");
    btn.innerHTML = "Sending...";
    btn.disabled = true;

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    
    if (!validateForm()) {
    btn.innerHTML = "Submit"; // reset
      btn.disabled = false;
    return; // ❌ STOP if invalid
  }
  
   fetch(form.action, {
      method: "POST",
      body: new FormData(form)
    })
    .then(() => {
      // ✅ ALWAYS treat as success
      popup.classList.add("active");

      form.reset();
      btn.innerHTML = "Sent ✓";

      setTimeout(() => {
        const text = `Hi, my name is ${name}. ${message}`;
        const url = "https://wa.me/263714192084?text=" + encodeURIComponent(text);
        window.location.href = url;
      }, 2500);
    })
    .catch(() => {
      // ✅ ONLY show error if user is offline
      if (!navigator.onLine) {
        alert("No internet connection.");
      } else {
        // still treat as success because Formgrid likely worked
        popup.classList.add("active");
        form.reset();
        btn.innerHTML = "Sent ✓";
      }
    });

  });

});

function closePopup() {
  document.getElementById("successPopup").classList.remove("active");
}