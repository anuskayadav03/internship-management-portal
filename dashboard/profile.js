// Login Check
const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user.isLoggedIn) {
    window.location.href = "login.html";
}

const loading = document.getElementById("loading");
const profileCard = document.getElementById("profileCard");

function loadProfile() {

    loading.classList.remove("d-none");

    setTimeout(() => {

        loading.classList.add("d-none");

        profileCard.classList.remove("d-none");

        document.getElementById("profileImage").src =
            "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(user.email);

        document.getElementById("profileName").innerHTML =
            user.email.split("@")[0];

        document.getElementById("profileEmail").innerHTML =
            "Email : " + user.email;

        document.getElementById("profileRole").innerHTML =
            "Role : " + user.role.toUpperCase();

    }, 800);

}

loadProfile();

function editProfile() {

    const newEmail = prompt("Enter new email", user.email);

    if (newEmail && newEmail.trim() !== "") {

        user.email = newEmail.trim();

        localStorage.setItem("user", JSON.stringify(user));

        loadProfile();

        alert("Profile Updated Successfully!");

    }

}

function logout() {

    localStorage.removeItem("user");

    window.location.href = "login.html";

}