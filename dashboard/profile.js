const loading = document.getElementById("loading");
const profileCard = document.getElementById("profileCard");

async function loadProfile() {

    try {

        const users = await fetchUsers();

        // Display the first user
        const user = users[0];

        profileCard.innerHTML = `
            <div class="col-md-6">
                <div class="card shadow text-center p-4">

                    <img src="${user.image}"
                         class="rounded-circle mx-auto"
                         width="150">

                    <h3 class="mt-3">
                        ${user.firstName} ${user.lastName}
                    </h3>

                    <p><strong>Email:</strong> ${user.email}</p>

                    <p><strong>Phone:</strong> ${user.phone}</p>

                    <p><strong>Company:</strong> ${user.company.name}</p>

                    <p><strong>Department:</strong> ${user.company.department}</p>

                    <p><strong>Address:</strong>
                        ${user.address.address},
                        ${user.address.city}
                    </p>

                </div>
            </div>
        `;

        loading.classList.add("d-none");
        profileCard.classList.remove("d-none");

    } catch (error) {

        loading.innerHTML =
            "<h4 class='text-danger'>Failed to load profile.</h4>";

    }

}

loadProfile();