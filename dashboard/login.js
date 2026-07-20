const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const role = document.getElementById("role").value;

if (email === "" || password === "") {

document.getElementById("error").innerText = "Please fill all fields.";

return;

}

const user = {

email,

role,

isLoggedIn: true

};

localStorage.setItem("user", JSON.stringify(user));

window.location.href = "dashboard.html";

});