/* CONTACT.JS
   This file validates the contact form.
   It checks all fields before the form
   is allowed to submit.*/

/* VALIDATE FORM FUNCTION 
   This runs when the user clicks "Send Message".
   event.preventDefault() stops the page from
   reloading (which is the browser's default
   behaviour for form submission). */
function validateForm(event) {
  // Stop the browser from refreshing the page
  event.preventDefault();

  // We'll use this to track if the form is valid
  var isValid = true;

  // Step 1: Clear any previous errors first
  clearErrors();

  // Step 2: Get the values from each field
  var name    = document.getElementById('name').value.trim();
  var email   = document.getElementById('email').value.trim();
  var phone   = document.getElementById('phone').value.trim();
  var message = document.getElementById('message').value.trim();

  // CHECK: Name must not be empty 
  if (name === '') {
    showError('name', 'nameError');
    isValid = false;
  }

  // CHECK: Email must not be empty AND must be valid format
  if (email === '') {
    showError('email', 'emailError');
    document.getElementById('emailError').textContent = 'Please enter your email address.';
    isValid = false;
  } else if (!isValidEmail(email)) {
    // Email is not empty but the format is wrong
    showError('email', 'emailError');
    document.getElementById('emailError').textContent = 'Please enter a valid email (e.g. name@example.com).';
    isValid = false;
  }

  // CHECK: Phone must not be empty AND must contain only digits 
  if (phone === '') {
    showError('phone', 'phoneError');
    document.getElementById('phoneError').textContent = 'Please enter your phone number.';
    isValid = false;
  } else if (!isValidPhone(phone)) {
    showError('phone', 'phoneError');
    document.getElementById('phoneError').textContent = 'Phone number must contain digits only (no spaces or dashes).';
    isValid = false;
  }

  // CHECK: Message must not be empty 
  if (message === '') {
    showError('message', 'messageError');
    isValid = false;
  }

  // Step 3: If everything is valid, show the success message
  if (isValid) {
    document.getElementById('successMsg').classList.add('show');

    // Clear the form fields
    document.getElementById('contactForm').reset();
  }
}

/* SHOW ERROR FUNCTION 
   Adds a red border to the input and
   shows the error message below it. */
function showError(inputId, errorId) {
  document.getElementById(inputId).classList.add('invalid');
  document.getElementById(errorId).classList.add('show');
}

/* CLEAR ERRORS FUNCTION
   Removes all red borders and error messages.
   Called at the start of validation so we
   get a fresh check each time. */
function clearErrors() {
  // Hide the success message too (in case it was shown before)
  document.getElementById('successMsg').classList.remove('show');

  // List of all field IDs
  var fields = ['name', 'email', 'phone', 'message'];

  for (var i = 0; i < fields.length; i++) {
    document.getElementById(fields[i]).classList.remove('invalid');
  }

  // List of all error message IDs
  var errors = ['nameError', 'emailError', 'phoneError', 'messageError'];

  for (var i = 0; i < errors.length; i++) {
    document.getElementById(errors[i]).classList.remove('show');
  }
}

/* IS VALID EMAIL FUNCTION 
   Checks that the email contains an @ symbol
   and a dot after it.
   The pattern /.../ is called a Regular Expression (regex).
   It's a way to check if a string matches a pattern. */
function isValidEmail(email) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
  // .test() returns true if the email matches the pattern,
  // false if it doesn't
}

/* IS VALID PHONE FUNCTION
   Checks that the phone number contains
   ONLY digits (0-9), no letters or symbols.
   The pattern /^\d+$/ means:
   ^ = start, \d = digit, + = one or more, $ = end */
function isValidPhone(phone) {
  var pattern = /^\d+$/;
  return pattern.test(phone);
}