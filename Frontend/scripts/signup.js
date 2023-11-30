document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    try {
      const response = await fetch('http://localhost:5000/api/v1/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, passwordConfirm }),
      });

      if (response.url !== 'http://localhost:5000/api/v1/user/signup') {
        // Redirect to the new URL
        window.location.href = response.url;
        return; // Exit the function to prevent further handling
      }

      const data = await response.json();
      console.log(data); // Handle the response accordingly
    } catch (error) {
      console.error(error);
    }
  });
});
