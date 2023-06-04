const { loginUser, signupUser } = require('../../utils/auth');

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    try {
      // Call the loginUser function from auth.js
      await loginUser(email, password);

      // If successful, redirect the browser to the landing page
      document.location.replace('/landing');
    } catch (error) {
      alert('Failed to log in. Please check your credentials and try again.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    try {
      // Call the signupUser function from auth.js
      await signupUser(name, email, password);

      // If successful, redirect the browser to the landing page
      document.location.replace('/landing');
    } catch (error) {
      alert('Failed to sign up. Please try again.');
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
