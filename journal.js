// Set current date in Indian format
const dateElement = document.getElementById("currentDate");
const today = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};
dateElement.textContent = today.toLocaleDateString("en-IN", options);

// Full list of journal prompts
const journalPrompts = [
  "What emotions have I been avoiding lately, and why?",
  "What made me feel most alive this week?",
  "If my inner voice wrote me a letter, what would it say?",
  "What am I holding onto that I need to let go?",
  "What does “healing” mean to me right now?",
  "What moment from today made me smile?",
  "What’s a recent challenge I overcame, and how did it make me feel?",
  "What am I most proud of this month?",
  "How have I shown love to myself recently?",
  "If I could relive one day from this week, which would it be and why?",
  "What are 3 things I'm grateful for today?",
  "If fear didn’t hold me back, what would I do right now?",
  "Who or what made me feel seen this week?",
  "What words do I wish someone said to me today?",
  "What am I learning about myself recently?"
];

// Helper: Shuffle an array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get a random set of N prompts (default: 5)
function getRandomPrompts(count = 5) {
  const shuffled = shuffleArray(journalPrompts);
  return shuffled.slice(0, count);
}

// Insert random prompts into .prompt-box
const promptBox = document.querySelector(".prompt-box");
const promptList = promptBox.querySelector("ul");

if (promptList) {
  const promptsToShow = getRandomPrompts(5);
  promptList.innerHTML = promptsToShow.map(prompt => `<li>${prompt}</li><br>`).join("");
}
// Scroll-to-top button logic
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display =
    window.scrollY > 200 ? "block" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
entries.push(userInput); // or { text: userInput, date: ... }
localStorage.setItem("journalEntries", JSON.stringify(entries));
