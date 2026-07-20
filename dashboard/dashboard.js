// Check Login
const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user.isLoggedIn) {
    window.location.href = "login.html";
}

// Welcome Message
document.getElementById("welcomeText").innerHTML =
    `Welcome, ${user.role.toUpperCase()}`;

document.getElementById("roleName").innerHTML =
    `Role : ${user.role.toUpperCase()}`;

document.getElementById("emailText").innerHTML =
    `Email : ${user.email}`;

// Logout
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// Loading Elements
const loading = document.getElementById("loading");
const dashboardCards = document.getElementById("dashboardCards");
const error = document.getElementById("error");

// Dashboard Data
async function loadDashboard() {

    try {

        loading.classList.remove("d-none");

        const users = await fetchUsers();
        const reports = await fetchReports();

        document.getElementById("studentCount").innerHTML = users.length;

        document.getElementById("reportCount").innerHTML = reports.length;

        document.getElementById("activeCount").innerHTML =
            Math.floor(users.length * 0.9);

        document.getElementById("pendingCount").innerHTML =
            Math.floor(reports.length * 0.3);

        loading.classList.add("d-none");

        dashboardCards.classList.remove("d-none");

        createChart(users.length, reports.length);

    } catch (e) {

        console.log(e);

        loading.classList.add("d-none");

        error.classList.remove("d-none");

    }

}

loadDashboard();

// Chart
function createChart(student, reports) {

    const ctx = document
        .getElementById("dashboardChart")
        .getContext("2d");

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [

                "Students",

                "Reports",

                "Attendance",

                "Performance"

            ],

            datasets: [

                {

                    label: "Portal Analytics",

                    data: [

                        student,

                        reports,

                        Math.floor(student * 0.9),

                        Math.floor(student * 0.8)

                    ]

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}
themeBtn.onclick=function(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");

}else{

localStorage.setItem("theme","light");

}

}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("bg-dark");

    document.body.classList.toggle("text-white");

    if (document.body.classList.contains("bg-dark")) {

        localStorage.setItem("theme", "dark");

    } else {

        localStorage.setItem("theme", "light");

    }

});
window.onload=()=>{

const theme=localStorage.getItem("theme");

if(theme==="dark"){

document.body.classList.add("dark");

}

}