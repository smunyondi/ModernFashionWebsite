// Show the sign-up modal
function showForm() {
  const modal = document.getElementById('signUpModal');
  modal.classList.add('show');
}

// Close the sign-up modal
function closeForm() {
  const modal = document.getElementById('signUpModal');
  modal.classList.remove('show');
}

// Real-time validation feedback
function validateField(field, regex, feedbackId, errorMessage) {
  const feedback = document.getElementById(feedbackId);
  if (regex.test(field.value)) {
    feedback.textContent = ''; // Clear feedback if valid
    field.classList.remove('invalid');
    field.classList.add('valid');
  } else {
    feedback.textContent = errorMessage; // Show error message
    field.classList.remove('valid');
    field.classList.add('invalid');
  }
}

// Handle form submission
document.getElementById('authForm')?.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  // Password requirements
  const lengthCheck = password.value.length >= 8;
  const uppercaseCheck = /[A-Z]/.test(password.value);
  const lowercaseCheck = /[a-z]/.test(password.value);
  const numberCheck = /\d/.test(password.value);
  const symbolCheck = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password.value);

  // Check all fields
  const isNameValid = name.value.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  const isPasswordValid = lengthCheck && uppercaseCheck && lowercaseCheck && numberCheck && symbolCheck;

  if (isNameValid && isEmailValid && isPasswordValid) {
    alert('Sign-up successful! Redirecting to the shopping page...');
    location.href = 'shopping.html'; // Redirect to shopping page
  } else {
    alert('Please ensure all fields are filled out correctly.');
  }
});

// Highlight the required field and show tooltip
function highlightField(field, message, isValid) {
  const notificationId = field.id + 'Notification';
  const notification = document.getElementById(notificationId);

  if (isValid) {
    field.classList.remove('highlight-red');
    field.classList.add('highlight-green'); // Add green highlight
    if (notification) {
      notification.parentElement.classList.remove('show'); // Hide tooltip
    }
  } else {
    field.classList.remove('highlight-green');
    field.classList.add('highlight-red'); // Add red highlight
    if (notification) {
      notification.textContent = message;
      notification.parentElement.classList.add('show'); // Show tooltip
    }
  }
}

// Remove highlight and hide tooltip when the field is valid
function removeHighlight(field) {
  field.classList.remove('highlight-red', 'highlight-green'); // Remove both highlights

  const notificationId = field.id + 'Notification';
  const notification = document.getElementById(notificationId);
  if (notification) {
    notification.parentElement.classList.remove('show'); // Hide tooltip
  }
}

// Automatically focus on the required field
function focusRequiredField() {
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');

  if (nameField.value.trim().length === 0) {
    highlightField(nameField, 'Please fill out your name first.', false); // Red highlight
    nameField.focus();
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
    highlightField(emailField, 'Please enter a valid email address.', false); // Red highlight
    emailField.focus();
  } else if (passwordField.disabled) {
    highlightField(passwordField, 'Please meet all password requirements.', false); // Red highlight
    passwordField.focus();
  }
}

// Real-time validation for the "Name" field
document.getElementById('name')?.addEventListener('input', (e) => {
      const name = e.target.value;
  const emailField = document.getElementById('email');

  if (name.trim().length > 0) {
    emailField.disabled = false; // Enable the email field
    highlightField(document.getElementById('name'), '', true); // Green highlight
    removeHighlight(document.getElementById('name')); // Remove tooltip
  } else {
    emailField.disabled = true; // Disable the email field
    document.getElementById('password').disabled = true; // Also disable the password field
    highlightField(document.getElementById('name'), 'Please fill out your name first.', false); // Red highlight
  }
});

// Real-time validation for the "Email" field
document.getElementById('email')?.addEventListener('input', (e) => {
  const email = e.target.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordField = document.getElementById('password');

  if (emailRegex.test(email)) {
    passwordField.disabled = false; // Enable the password field
    highlightField(document.getElementById('email'), '', true); // Green highlight
    removeHighlight(document.getElementById('email')); // Remove tooltip
  } else {
    passwordField.disabled = true; // Disable the password field
    highlightField(document.getElementById('email'), 'Please enter a valid email address.', false); // Red highlight
  }
      });

      // Real-time password validation
    document.getElementById('password')?.addEventListener('input', (e) => {
  const password = e.target.value;
  const submitButton = document.getElementById('submitButton');
  const strengthText =       document.getElementById('strengthText');

  // Password requirements
  const lengthCheck = password.length >= 8;
  const uppercaseCheck = /[A-Z]/.test(password);
  const lowercaseCheck = /[a-z]/.test(password);
  const numberCheck = /\d/.test(password);
  const symbolCheck = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

  // Update symbols
  document.getElementById('uppercaseSymbol').className = uppercaseCheck ? 'symbol valid' : 'symbol invalid';
  document.getElementById('lowercaseSymbol').className = lowercaseCheck ? 'symbol valid' : 'symbol invalid';
  document.getElementById('numberSymbol').className = numberCheck ? 'symbol valid' : 'symbol invalid';
  document.getElementById('symbolSymbol').className = symbolCheck ? 'symbol valid' : 'symbol invalid';

  // Determine password strength
  if (lengthCheck && uppercaseCheck && lowercaseCheck && numberCheck && symbolCheck) {
    if (password.length > 10) {
      strengthText.textContent = 'Strong';
      strengthText.className = 'strength-strong';
  } else {
      strengthText.textContent = 'Medium';
      strengthText.className = 'strength-medium';
}
submitButton.disabled = false; // Enable the submit button
  } else {
    strengthText.textContent = 'Weak';
    strengthText.className = 'strength-weak';
    submitButton.disabled = true; // Disable the submit button
  }
});

// Redirect focus if the user clicks elsewhere
document.getElementById('authForm')?.addEventListener('click', (e) => {
  focusRequiredField();
  });

// Highlight the first field on page load
window.addEventListener('load', () => {
  highlightField(document.getElementById('name'), '', true); // Green highlight for the first field
});

// Newsletter Subscription
document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  const feedback = document.getElementById('newsletterFeedback');

  if (email.trim() !== '') {
    feedback.textContent = 'Thank you for subscribing!';
    feedback.style.color = '#28a745'; // Green for success
  } else {
    feedback.textContent = 'Please enter a valid email.';
    feedback.style.color = '#dc3545'; // Red for error
  }
});

// Interactive Tabs for "Explore More" Section
function initializeExploreMoreTabs() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      const target = e.target.getAttribute('data-tab');

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.classList.remove('active');
      });

      // Show the selected tab content
      document.getElementById(`tab${target}`).classList.add('active');
    });
  });
}

// Initialize the "Explore More" tabs on page load
window.addEventListener('load', () => {
  initializeExploreMoreTabs();
});

// Back-to-Top Button
const backToTopButton = document.getElementById('backToTopButton');

window.addEventListener('scroll', () => {
  if (window.scrollY > 1200) {
    backToTopButton.style.display = 'block'; // Show button when scrolled down
  } else {
    backToTopButton.style.display = 'none'; // Hide button when at the top
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
});

// Footer Resize on Scroll
const footer = document.querySelector('.footer');

window.addEventListener('scroll', () => {
  if (window.scrollY > 1200) {
    footer.classList.add('expanded'); // Expand the footer
  } else {
    footer.classList.remove('expanded'); // Shrink the footer
  }
});

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}