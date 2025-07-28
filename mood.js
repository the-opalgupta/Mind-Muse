// Quotes for each mood
const moodQuotes = {
    Loved: ["You are loved, deeply and wholly. Let it warm your chest today. 💖",
        "You don’t have to earn love — you already are it.",
        "Even when you forget it, you are held in someone’s heart.",
        "You are the kind of person someone prays to meet."
    ],
    Grateful: ["Gratitude unlocks abundance. There's beauty in the small things. 🙏",
        "Gratitude turns ordinary days into blessings.",
        "What you appreciate, appreciates.",
        "Today, thank your heart for showing up for you again."
    ],
    Happy: ["Happiness looks good on you. Bask in it. 😄",
        "Let happiness stretch out in you like morning sun through curtains.",
        "Joy doesn’t have to be loud to be real.",
        "Even a moment of laughter can rewrite your whole day."
    ],
    Calm: ["Stillness is strength too. Breathe. Be. 🌿",
        "Peace isn’t the absence of chaos, it’s the stillness within it.",
        "You don’t have to rush. Nothing beautiful grows overnight.",
        "Silence can be a soft place to land."
    ],
    Anxious: ["Even now, you're doing your best. That's enough. 🤍",
        "Your worth isn't tied to how well you hide your fear.",
        "Take it one breath at a time. You are still safe here.",
        "You are allowed to pause without guilt."
    ],
    Overwhelmed: ["One breath. One step. You’re not alone. 🌊",
        "It’s okay to not be okay. You’re allowed to fall apart and still heal.",
        "You don’t need to carry everything at once.",
        "Slow down, love. You weren’t meant to do this alone."
    ],
    Sad: ["Your feelings are valid. Let the tears water your soul. 😔",
        "Sadness isn’t weakness — it’s a message from the soul.",
        "You can bloom even with broken roots.",
        "Even in the quiet ache, you are growing."
    ],
    Angry: ["It’s okay to feel. Let it pass through, not control you. 🔥",
        "Anger is pain’s bodyguard — listen to it with care.",
        "You’re allowed to be angry. You’re just not meant to live there.",
        "Fire can destroy — but it can also illuminate."
    ]
};

const form = document.getElementById("mood-form");
const quoteBox = document.getElementById("quote-box");

// Load saved mood (if any)
window.addEventListener("DOMContentLoaded", () => {
    const savedMood = localStorage.getItem("todayMood");
    if (savedMood) {
        showMoodQuote(savedMood);
        // Also check the corresponding radio
        const radio = document.querySelector(`input[value="${savedMood}"]`);
        if (radio) radio.checked = true;
    }
});

form.addEventListener("change", (e) => {
    if (e.target.name === "mood") {
        const mood = e.target.value;
        localStorage.setItem("todayMood", mood);
        showMoodQuote(mood);
    }
});

function showMoodQuote(mood) {
    const quotes = moodQuotes[mood];
    const quote = quotes ? quotes[Math.floor(Math.random() * quotes.length)] : "Every mood matters. Check in with your heart.";
    
    quoteBox.classList.add("fade");

    setTimeout(() => {
        const today = new Date();
        const dateString = today.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        quoteBox.innerHTML = `
      <p>${quote}</p>
      <small style="display:block;margin-top:8px;font-size:14px;color:#666;">
        Mood: <strong>${mood}</strong> | ${dateString}
      </small>
    `;
        quoteBox.classList.remove("fade");
    }, 300);
}

// Show/hide Top Button
const topBtn = document.getElementById("top-btn");

window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

// Scroll to top when clicked
topBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
moodHistory.push({ mood: selectedMood, date: new Date().toISOString() });
localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
