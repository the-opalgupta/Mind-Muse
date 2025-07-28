const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "museuser" && password === "stardust") {
    if (document.getElementById("rememberMe").checked) {
      localStorage.setItem("loggedIn", "true");
    } else {
      localStorage.setItem("loggedIn", "true"); // Even without rememberMe
    }

    setTimeout(() => {
      window.location.href = "profile.html";
    }, 200); // Give localStorage time to save
  } else {
    alert("Invalid credentials. Try 'museuser' & 'stardust'.");
  }
});
