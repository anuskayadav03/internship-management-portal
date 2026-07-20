const loginForm=document.getElementById("loginForm");

loginForm.addEventListener("submit",function(e){

e.preventDefault();

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value.trim();

const role=document.getElementById("role").value;

if(email===""||password===""){

document.getElementById("error").innerHTML="Please fill all fields.";

return;

}

const user={

email,

role,

isLoggedIn:true

};

localStorage.setItem("user",JSON.stringify(user));

window.location.href="index.html";

});