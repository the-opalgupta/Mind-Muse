const entryTitle = document.querySelector('.entry h2');
if (localStorage.getItem("username")) {
  entryTitle.innerHTML = `Welcome back, <br>${localStorage.getItem("username")}`;
}

// === Toggle Music Button ===
let music = document.getElementById("bg-music");
let musicBtn = document.querySelector(".music-btn");
let isPlaying = false;

function toggleMusic() {
  if (isPlaying) {
    music.pause();
    musicBtn.classList.remove("glow");
  } else {
    music.play();
    musicBtn.classList.add("glow");
  }
  isPlaying = !isPlaying;
}

// === Card Flip on Touch Devices ===
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // === Scroll to Top Button ===
  const topBtn = document.getElementById("top-btn");

  if (topBtn) {
    window.addEventListener("scroll", () => {
      topBtn.style.display = window.scrollY > 100 ? "block" : "none";
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // === Daily Quote ===
  const quoteBox = document.querySelector(".quote-content p");

  if (quoteBox) {
    const quotes = [
      "Even the smallest steps count.",
      "Muse your mood, muse your mind.",
      "You are your softest place.",
      "Let your heart breathe through ink.",
      "The chaos is making you art.",
      "This is where my thoughts come to rest.",
      "Unfolding.Unfiltered.Undone.",
      "A mirror, a map, a moodboard of me.",
      "Not everything I feel makes it to the surface.But it makes it here.",
      "You’re allowed to be both a masterpiece and a work in progress.",
      "Not every day is good, but there’s good in every day.",
      "One small step today can lead to giant leaps tomorrow.",
      "Feel it all, heal through it, grow past it.",
      "Even the moon goes through phases—so will you.",
      "Softness is not weakness. It's power under control.",
      "Rest is productive.",
      "There’s bravery in just continuing.",
      "Let yourself bloom at your own pace.",
      "You don’t have to have it all figured out to keep going.",
      "Healing isn’t linear, and that’s okay.",
      "Some days you plant the seeds. Some days you bloom.",
      "You are your home. Don’t forget to come back.",
      "Keep shining. Even your softest light matters.",
      "A messy day doesn’t make you a mess.",
      "Romanticize your life. You deserve to feel magic daily.",
      "You are enough, even on your worst days.",
      "Be curious, not critical, about yourself.",
      "You’re not late. You’re on your unique timeline.",
      "You didn’t come this far to only come this far."
    ];

    const today = new Date().toISOString().split('T')[0];
    const storedDate = localStorage.getItem("quoteDate");
    let quoteIndex = localStorage.getItem("quoteIndex");

    if (storedDate !== today || quoteIndex === null) {
      quoteIndex = Math.floor(Math.random() * quotes.length);
      localStorage.setItem("quoteIndex", quoteIndex);
      localStorage.setItem("quoteDate", today);
    }

    quoteBox.textContent = quotes[quoteIndex];
    quoteBox.classList.add("show");
  }
});
