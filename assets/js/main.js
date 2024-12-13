// Variables
var signupBtn = document.getElementById("signupBtn");
var loginBtn = document.querySelector("button");
var userEmailInput = document.getElementById("user__email");
var userPasswordInput = document.getElementById("your__password");
var usersArray = JSON.parse(localStorage.getItem("usersArray"));
var errorMessage = document.getElementById("errorMessage");

//  userArray = [ { username: 'ahmed samir' , email: 'ahmed@ahmed.com' } , { username: 'ahmed samir' , email: 'ahmed@ahmed.com' }  , username: 'ahmed samir' , email: 'ahmed@ahmed.com' ]

console.log(localStorage.getItem("loggedUser"))


if (localStorage.getItem("loggedUser")) {
  setTimeout(function () {
    window.location.href = "home.html";
  }, 1100);
}
else {
  document.getElementById('myForm').classList.remove('d-none')
  document.getElementById('spinner').classList.add('d-none')
}

// Function to open signup form
signupBtn.addEventListener("click", function () {
  window.location.href = "signup.html";
});

// Function to open home page if useremail and password are right
loginBtn.addEventListener("click", function () {
  for (var i = 0; i < usersArray.length; i++) {
    if (
      usersArray[i].userEmail === userEmailInput.value &&
      usersArray[i].userPassword === userPasswordInput.value
    ) {
      userEmailInput.classList.add("is-valid");
      userPasswordInput.classList.add("is-valid");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your signin is successful!",
        showConfirmButton: false,
        timer: 1100,
      });
      localStorage.setItem("loggedUser", usersArray[i].userName);
      setTimeout(function () {
        window.location.href = "home.html";
      }, 1100);
      return;
    } 
  }
  errorMessage.classList.remove("d-none");
});
