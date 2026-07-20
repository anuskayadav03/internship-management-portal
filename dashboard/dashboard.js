// Get Elements
const loading = document.getElementById("loading");
const dashboardCards = document.getElementById("dashboardCards");
const error = document.getElementById("error");

async function loadDashboard() {
    try {
        // Fetch data from APIs
        const users = await fetchUsers();
        const reports = await fetchReports();

        // Dashboard Statistics
        document.getElementById("studentCount").textContent = users.length;
        document.getElementById("reportCount").textContent = reports.length;
        document.getElementById("activeCount").textContent = users.length;
        document.getElementById("pendingCount").textContent = Math.floor(reports.length / 2);

        // Hide loading and show dashboard
        loading.classList.add("d-none");
        dashboardCards.classList.remove("d-none");

    } catch (err) {
        console.error(err);

        loading.classList.add("d-none");
        error.classList.remove("d-none");
    }
}

loadDashboard();
function logout() {

localStorage.removeItem("user");

window.location.href = "login.html";

}