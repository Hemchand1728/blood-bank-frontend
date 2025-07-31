// Ensure user is logged in
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcome");
  const dashboard = document.getElementById("dashboard");

  // Set welcome message
  if (welcome) {
    welcome.innerHTML = `Welcome, <span class="username">${user.name}</span> <span class="role-tag">(${user.role})</span>`;
  }

  // Show role-specific options
  if (dashboard) {
    if (user.role === "donor") {
      dashboard.innerHTML = `
        <a href="donor/profile.html" class="card-link">📝 Update Profile</a>
        <a href="donor/donate.html" class="card-link">📅 Schedule Donation</a>
        <a href="donor/history.html" class="card-link">📖 Donation History</a>
        <a href="donor/eligibility.html" class="card-link">🩸 Check Eligibility</a>
      `;
    } else if (user.role === "recipient") {
      dashboard.innerHTML = `
        <a href="recipient/request.html" class="card-link">💉 Request Blood</a>
        <a href="recipient/track.html" class="card-link">📊 Track Request Status</a>
      `;
    } else if (user.role === "admin") {
      dashboard.innerHTML = `
        <a href="admin/approve.html" class="card-link">✅ Approve/Reject Requests</a>
        <a href="admin/inventory.html" class="card-link">📦 Inventory Dashboard</a>
      `;
    }
  }

  // Logout event
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });
  }
});