document.getElementById('requestForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'recipient') {
    alert('Please login as a recipient.');
    window.location.href = '../login.html';
    return;
  }

  const bloodGroup = document.getElementById('bloodGroup').value;
  const location = document.getElementById('location').value;
  const reason = document.getElementById('reason').value;

  try {
    const res = await fetch(`${apiUrl}/api/recipient/request/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        email: user.email,
        bloodGroup,
        location,
        reason
      })
    });

    const data = await res.json();
    const msgEl = document.getElementById('msg');

    if (res.ok) {
      msgEl.style.color = 'green';
      msgEl.textContent = data.message || '✅ Request submitted successfully!';
    } else {
      msgEl.style.color = 'red';
      msgEl.textContent = `❌ ${data.message || "Something went wrong"}`;
    }
  } catch (error) {
    console.error(error);
    const msgEl = document.getElementById('msg');
    msgEl.style.color = 'red';
    msgEl.textContent = '❌ Failed to connect to server.';
  }
});