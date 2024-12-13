// Varaiables
var logoutBtn = document.querySelector("button");
var loggedUser = localStorage.getItem("loggedUser");

// Function to close homePage and return back to login page
logoutBtn.addEventListener("click", function () {
  window.location.href = "index.html";
  localStorage.removeItem("loggedUser");
});

// Manipulate html
function displayUserName() {
  document.getElementById("username").innerText = ` 
${loggedUser}
`;
}
displayUserName();
