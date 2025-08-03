// admin/login.js

async function adminLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  if (!email || !password) {
    msg.innerText = "Please fill in all fields";
    msg.style.color = "red";
    return;
  }

  try {
    const res = await fetch(`${apiUrl}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      msg.style.color = "green";
      msg.innerText = result.message || "Login successful ✅";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      msg.style.color = "red";
      msg.innerText = result.message || "Invalid credentials ❌";
    }
  } catch (err) {
    console.error("Login error:", err);
    msg.innerText = "Something went wrong. Please try again later.";
    msg.style.color = "red";
  }
}

// Auto-attach the form submit handler
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adminLoginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      adminLogin();
    });
  }
});