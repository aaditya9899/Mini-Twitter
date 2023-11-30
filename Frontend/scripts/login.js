document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorContainer = document.getElementById('errorContainer');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.redirected) {
        // Redirect to the new URL
        window.location.href = response.url;
        return; // Exit the function to prevent further handling
      }

      const data = await response.json();

      if (data.error) {
        errorContainer.innerText = '⚠️ ' + data.msg;
        errorContainer.style.color = 'red'; // Style the error message
        return false;
      } else {
        errorContainer.innerText = ''; // Clear the error message
        // Handle successful login
      }
    } catch (error) {
      console.error(error);
    }
  });
});
