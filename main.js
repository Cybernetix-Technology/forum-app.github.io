"use strict";
// Some JavaScript Actions

// Navbar
const hideIconBar = function () {
  const iconBar = document.getElementById("iconBar");
  const navigation = document.getElementById("navigation");
  iconBar.setAttribute("style", "display:none;");
  navigation.classList.remove("hide");
};

const showIconBar = function () {
  const iconBar = document.getElementById("iconBar");
  const navigation = document.getElementById("navigation");
  iconBar.setAttribute("style", "display:block;");
  navigation.classList.add("hide");
};

const showComment = function () {
  const commentArrea = document.getElementById("comment-area");
  commentArrea.setAttribute("style", "display:block");
};

const showReply = function () {
  const replyArrea = document.getElementById("reply-area");
  replyArrea.setAttribute("style", "display:block");
};

// Contact Form
const nameError = document.getElementById("name-error");
const phoneError = document.getElementById("phone-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const submitError = document.getElementById("submit-error");

// ValidateName
const validateName = () => {
  const name = document.getElementById("contact-name").value;
  if (name.length === 0) {
    nameError.innerHTML = "Name is required.";
    return false;
  }
  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = "Write your fullname";
    return false;
  }
  // nameError.innerHTML = '<i class="fas fa-check-circle"></i>';
  nameError.innerHTML = '<i class="fa fa-user-check"></i>';
  return true;
};

// ValidatePhone
const validatePhone = () => {
  const phone = document.getElementById("contact-phone-number").value;

  if (phone.length === 0) {
    phoneError.innerHTML = "Phone number is required";
    return false;
  }

  if (phone.length !== 11) {
    phoneError.innerHTML = "Phone number should be 11 digits";
    return false;
  }

  if (!phone.match(/^[0-9]{11}$/)) {
    phoneError.innerHTML = "Only digits are allowed.";
    return false;
  }

  phoneError.innerHTML = '<i class="fa fa-user-check"></i>';
  return true;
};

// ValidateEmail
const validateEmail = () => {
  const email = document.getElementById("contact-email").value;

  if (email.length === 0) {
    emailError.innerHTML = "Email address is required";
    return false;
  }

  if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.innerHTML = "Invalid email address.";
    return false;
  }

  emailError.innerHTML = '<i class="fa fa-user-check"></i>';
  return true;
};

// ValidateMessage
const validateMessage = () => {
  const message = document.getElementById("contact-message").value;
  const required = 30;
  const left = required - message.length;

  if (left > 0) {
    messageError.innerHTML = left + " more characters are required";
    return false;
  }

  messageError.innerHTML = '<i class="fa fa-user-check"></i>';
  return true;
};

// ValidateForm
const validateForm = () => {
  if (
    !validateName() ||
    !validatePhone() ||
    !validateEmail() ||
    !validateMessage()
  ) {
    submitError.style.display = "block";
    submitError.innerHTML =
      "You must fill all the blank spaces before submitting.";
    setTimeout(function () {
      submitError.style.display = "none";
    }, 3000);
    return false;
  }
};

// SignIn-SignUp Form Validation
const container = document.querySelector(".container-header-form");
const headingSpan2 = document.querySelector(".heading-span-2");
const form = document.querySelector(".form");
const clearForm = () => {
  document.querySelectorAll(".form-input-wrapper").forEach((item) => {
    item.className = "form-input-wrapper";
  });
  form.request();
};

document.querySelector(".signup-btn").addEventListener("click", () => {
  container.classList.add("change");
  setTimeout(() => {
    headingSpan2.textContent = "Up";
  }, 200);
  form.className = "form sign-up";
  clearForm();
});

document.querySelector(".signin-btn").addEventListener("click", () => {
  container.classList.remove("change");
  setTimeout(() => {
    headingSpan2.textContent = "In";
  }, 200);
  form.className = "form sign-in";
  clearForm();
});

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const error = (input, message) => {
  const inputWrapper = input.parentElement;
  inputWrapper.className = "form-input-wrapper error";
  inputWrapper.querySelector(".error-message").textContent = message;
};

const success = (input) => {
  const inputWrapper = input.parentElement;
  inputWrapper.className = "form-input-wrapper success";
};

const checkEmail = (input) => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regEx.test(input.value.trim())) {
    success(input);
  } else {
    error(input, `Email is not valid`);
  }
};

const checkRequiredFields = (inputArr) => {
  inputArr.forEach((input) => {
    // Error
    if (input.value.trim() === "") {
      if (input.id === "password2") {
        error(input, "Password confirmation is required.");
      } else {
        error(input, `${input.id} is required.`);
      }
    } else {
      // Success
      success(input);
    }
  });
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    error(input, `${input.id} must be at least ${min} characters long.`);
  } else if (input.value.length > max) {
    error(input, `${input.id} must be less than ${max} characters long.`);
  } else {
    success(input);
  }
};

const passwordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    error(input2, `Passwords do not match.`);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (form.classList[1] === "sign-up") {
    checkRequiredFields([username, email, password, password2]);
    checkLength(username, 5, 15);
    checkLength(password, 5, 25);
    passwordMatch(password, password2);
  } else {
    checkRequiredFields([email, password]);
  }
  checkEmail(email);
});
