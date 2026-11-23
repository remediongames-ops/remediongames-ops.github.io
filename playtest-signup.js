const playtestForm = document.getElementById("test-form");
const submitButton = playtestForm.querySelector('button[type="submit"]');
const signupStatus = document.getElementById("test-status");

playtestForm.addEventListener("submit", (event) => {
  if (submitButton.getAttribute("aria-disabled") === "true") {
    event.preventDefault();
    return;
  }

  submitButton.setAttribute("aria-disabled", "true");
  signupStatus.textContent = signupStatus.dataset.sending;
});

window.addEventListener("pageshow", () => {
  submitButton.removeAttribute("aria-disabled");
  signupStatus.textContent = "";
});
