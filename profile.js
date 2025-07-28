// === Mood Stats ===
const moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];

const moodCounts = {
  Happy: 0,
  Sad: 0,
  Angry: 0,
  Calm: 0,
  Loved: 0,
  Grateful: 0
};

moodHistory.forEach(entry => {
  const mood = entry.mood;
  if (moodCounts[mood] !== undefined) {
    moodCounts[mood]++;
  }
});

document.getElementById("happyCount").textContent = moodCounts.Happy;
document.getElementById("sadCount").textContent = moodCounts.Sad;
document.getElementById("angryCount").textContent = moodCounts.Angry;
document.getElementById("calmCount").textContent = moodCounts.Calm;

// === Journal Entries ===
const journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

const journalList = document.getElementById("journalEntries");
journalEntries.slice(-5).reverse().forEach(entry => {
  const li = document.createElement("li");
  li.textContent = `"${entry}"`;
  journalList.appendChild(li);
});

// === Becoming Tracker ===
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const goalList = document.getElementById("goalProgress");
let completed = 0;

tasks.forEach(task => {
  const li = document.createElement("li");
  const status = document.createElement("span");
  status.classList.add("status");

  if (task.completed) {
    status.textContent = "Done";
    completed++;
  } else {
    status.textContent = "In Progress";
  }

  li.textContent = `🌟 ${task.text} – `;
  li.appendChild(status);
  goalList.appendChild(li);
});

// Progress bar
const percent = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
document.getElementById("goalProgressBar").style.width = `${percent}%`;

tasks[index].completed = true;
localStorage.setItem("tasks", JSON.stringify(tasks));
