// Variables
var signinBtn = document.getElementById("signinBtn");
var signupMain = document.getElementById("signupMain");
var userNameInput = document.getElementById("user__name");
var userEmailInput = document.getElementById("user__email");
var userPasswordInput = document.getElementById("your__password");
var errorName = document.querySelector("#errorName");
var errorEmail = document.querySelector("#errorEmail");
var errorPassword = document.querySelector("#errorPassword");
var usersArray;
// function to open login page
signinBtn.addEventListener("click", function () {
  window.location.href = "index.html";
});

// Retriving users data from local storage
var isUsersArray = localStorage.getItem("usersArray");
if (isUsersArray) {
  usersArray = JSON.parse(isUsersArray);
} else {
  usersArray = [];
}

// Function to validate userName
var isValidUserName;
userNameInput.addEventListener("input", function () {
  var userNameRegex = /^[a-zA-Z]{3,10} [a-zA-Z]{3,10}$/;
  isValidUserName = userNameRegex.test(userNameInput.value);
  if (userNameInput.value.length === 0) {
    userNameInput.classList.remove("is-invalid", "is-valid");
    return;
  }
  if (isValidUserName) {
    userNameInput.classList.remove("is-invalid");
    userNameInput.classList.add("is-valid");
  } else {
    userNameInput.classList.add("is-invalid");
    userNameInput.classList.remove("is-valid");
  }
});

// Function to check if userEmail is already used
function isUserEmailUsed() {
  for (var i = 0; i < usersArray.length; i++) {
    if (JSON.parse(isUsersArray)[i].userEmail === userEmailInput.value) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Email is already used!",
        showConfirmButton: false,
        timer: 1100,
      });
      userEmailInput.classList.add("is-invalid");
      return true;
    }
  }
  return false;
}

// Function to validate userEmail
var isValidUserEmail;
userEmailInput.addEventListener("input", function () {
  var userEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isValidUserEmail = userEmailRegex.test(userEmailInput.value);
  if (userEmailInput.value.length === 0) {
    userEmailInput.classList.remove("is-invalid", "is-valid");
    return;
  }
  if (isValidUserEmail && !isUserEmailUsed()) {
    userEmailInput.classList.remove("is-invalid");
    userEmailInput.classList.add("is-valid");
  } else {
    userEmailInput.classList.add("is-invalid");
    userEmailInput.classList.remove("is-valid");
  }
});

// Function to validate userPassword
var isValidUserPassword;
userPasswordInput.addEventListener("input", function () {
  var userPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  isValidUserPassword = userPasswordRegex.test(userPasswordInput.value);
  if (userPasswordInput.value.length === 0) {
    userPasswordInput.classList.remove("is-invalid", "is-valid");
    return;
  }
  if (isValidUserPassword) {
    userPasswordInput.classList.remove("is-invalid");
    userPasswordInput.classList.add("is-valid");
  } else {
    userPasswordInput.classList.add("is-invalid");
    userPasswordInput.classList.remove("is-valid");
  }
});

// function to open the login page again after registration
signupMain.addEventListener("click", function () {
  // Successful registration for all inputs
  if (
    isValidUserName &&
    isValidUserEmail &&
    isValidUserPassword &&
    !isUserEmailUsed()
  ) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your signup has been successful!",
      showConfirmButton: false,
      timer: 1100,
    });
    setTimeout(function () {
      window.location.href = "index.html";
    }, 1100);
    return;
    // All inputs are invalid
  } else if (!isValidUserName && !isValidUserEmail && !isValidUserPassword) {
    errorName.classList.remove("d-none");
    errorEmail.classList.remove("d-none");
    errorPassword.classList.remove("d-none");
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Invalid inputs. Please try again.",
      showConfirmButton: false,
      timer: 1100,
    });
    return;
  } else if (!isValidUserName && !isValidUserEmail && isValidUserPassword) {
    errorName.classList.remove("d-none");
    errorEmail.classList.remove("d-none");
  } else if (isValidUserEmail && !isValidUserPassword && !isValidUserName) {
    errorName.classList.remove("d-none");
    errorPassword.classList.remove("d-none");
  } else if (!isValidUserPassword && isValidUserName && !isValidUserEmail) {
    errorPassword.classList.remove("d-none");
    errorEmail.classList.remove("d-none");
  } else if (!isValidUserName) {
    errorName.classList.remove("d-none");
  } else if (!isValidUserEmail) {
    errorEmail.classList.remove("d-none");
  } else if (!isValidUserPassword) {
    errorPassword.classList.remove("d-none");
  }
});

// Function to handle signUp data for new users
signupMain.addEventListener("click", handleSignUp);
function handleSignUp() {
  userData = {
    userName: userNameInput.value,
    userEmail: userEmailInput.value,
    userPassword: userPasswordInput.value,
  };

  if (
    isValidUserName &&
    isValidUserEmail &&
    isValidUserPassword &&
    !isUserEmailUsed()
  ) {
    usersArray.push(userData);
    handleLocalStorage();
  }
}

// Function to handle localStorage
function handleLocalStorage() {
  localStorage.setItem("usersArray", JSON.stringify(usersArray));
}
