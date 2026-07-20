
const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user.isLoggedIn) {
    window.location.href = "login.html";
}


document.getElementById("welcomeText").textContent =
    "Welcome, " + user.role.toUpperCase();

document.getElementById("roleName").textContent =
    "Role : " + user.role.toUpperCase();

document.getElementById("emailText").textContent =
    "Email : " + user.email;


function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

});

const loading = document.getElementById("loading");
const dashboardCards = document.getElementById("dashboardCards");
const error = document.getElementById("error");

async function loadDashboard() {

    loading.classList.remove("d-none");
    dashboardCards.classList.add("d-none");
    error.classList.add("d-none");

    try {

        const users = await fetchUsers();
        const reports = await fetchReports();

        document.getElementById("studentCount").textContent = users.length;
        document.getElementById("reportCount").textContent = reports.length;
        document.getElementById("activeCount").textContent = users.length;
        document.getElementById("pendingCount").textContent = Math.floor(reports.length / 2);

        loading.classList.add("d-none");
        dashboardCards.classList.remove("d-none");

        createChart(users.length, reports.length);

    } catch (err) {

        console.error(err);

        loading.classList.add("d-none");
        error.classList.remove("d-none");

    }

}

loadDashboard();

function createChart(studentCount, reportCount) {

    const canvas = document.getElementById("dashboardChart");

    if (!canvas) return;

    new Chart(canvas, {

        type: "bar",

        data: {

            labels: [
                "Students",
                "Reports",
                "Attendance",
                "Performance"
            ],

            datasets: [{
                label: "Portal Analytics",

                data: [
                    studentCount,
                    reportCount,
                    96,
                    89
                ]
            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}