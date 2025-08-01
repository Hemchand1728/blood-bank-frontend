// ✅ Full working login.js

// Attach this to login.html via <script src="../js/login.js"></script>
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const msg = document.getElementById("msg");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      const res = await fetch(apiUrl + `"/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Store token + email + role in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);

        if (data.role === "Donor") window.location.href = "../donor/dashboard.html";
        else if (data.role === "Recipient") window.location.href = "../recipient/dashboard.html";
        else if (data.role === "Admin") window.location.href = "../admin/dashboard.html";
      } else {
        msg.innerText = data.message || "Login failed";
        msg.style.color = "red";
      }
    } catch (err) {
      console.error("Login Error:", err);
      msg.innerText = "Something went wrong";
      msg.style.color = "red";
    }
  });
});