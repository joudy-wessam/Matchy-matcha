const matcha = document.querySelector(".matcha");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-item");

matcha.addEventListener("click", function () {
  matcha.classList.toggle("active");
  navLinks.classList.toggle("active");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    matcha.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

document.addEventListener("click", function (e) {
  if (!matcha.contains(e.target) && !navLinks.contains(e.target)) {
    matcha.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

const video = document.getElementById("matchaVideo");
const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {
  video.play();
  playBtn.style.display = "none";
});

let offerEnd = localStorage.getItem("offerEnd");

if (!offerEnd) {
  offerEnd = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // أول مرة
  localStorage.setItem("offerEnd", offerEnd);
}

const timer = setInterval(function () {
  const now = new Date().getTime();
  const distance = offerEnd - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.querySelector(
    ".countdown"
  ).innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(timer);
    document.querySelector(".countdown").innerHTML = "OFFER ENDED ⏳";
    localStorage.removeItem("offerEnd"); // يمسح عشان يبدأ من جديد بعدين لو عايزة
  }
}, 1000);
