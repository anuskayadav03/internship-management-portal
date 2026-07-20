// Login Protection
const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user.isLoggedIn) {
    window.location.href = "login.html";
}

const loading = document.getElementById("loading");
const profileCard = document.getElementById("profileCard");

// Load Profile
function loadProfile() {

    loading.classList.remove("d-none");

    setTimeout(() => {

        loading.classList.add("d-none");

        profileCard.classList.remove("d-none");

        profileCard.innerHTML = `

        <div class="col-md-6">

            <div class="card shadow">

                <div class="card-body text-center">

                    <img
                        src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}&size=150"
                        class="rounded-circle mb-3">

                    <h3>User Profile</h3>

                    <hr>

                    <p><strong>Email:</strong> ${user.email}</p>

                    <p><strong>Role:</strong> ${user.role.toUpperCase()}</p>

                    <button
                        class="btn btn-primary"
                        onclick="editProfile()">

                        Edit Profile

                    </button>

                </div>

            </div>

        </div>

        `;

    },1000);

}

loadProfile();

// Edit Profile
function editProfile(){

    const newEmail = prompt("Enter New Email", user.email);

    if(newEmail && newEmail.trim() !== ""){

        user.email = newEmail.trim();

        localStorage.setItem("user", JSON.stringify(user));

        loadProfile();

        alert("Profile Updated Successfully!");

    }

}

// Logout
function logout(){

    localStorage.removeItem("user");

    window.location.href = "login.html";

}