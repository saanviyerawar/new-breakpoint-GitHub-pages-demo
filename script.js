const year = document.getElementById("year");
const welcomeMessage = document.getElementById("welcome-message");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (welcomeMessage) {
  welcomeMessage.textContent = "Thanks for visiting this simple private GitHub Pages website.";
}
