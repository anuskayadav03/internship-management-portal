// Login Protection
const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user.isLoggedIn) {
    window.location.href = "login.html";
}

const loading = document.getElementById("loading");
const reportTable = document.getElementById("reportTable");
const searchInput = document.getElementById("searchReport");

let reports = [];
let currentPage = 1;
const reportsPerPage = 10;

// Load Reports
async function loadReports() {

    loading.style.display = "block";

    reports = await fetchReports();

    loading.style.display = "none";

    renderReports();

}

loadReports();

// Render Reports
function renderReports() {

    reportTable.innerHTML = "";

    let keyword = searchInput.value.toLowerCase();

    let filtered = reports.filter(report =>
        report.title.toLowerCase().includes(keyword) ||
        report.body.toLowerCase().includes(keyword)
    );

    let start = (currentPage - 1) * reportsPerPage;
    let end = start + reportsPerPage;

    filtered.slice(start, end).forEach(report => {

        reportTable.innerHTML += `
        <tr>

            <td>${report.id}</td>

            <td>${report.title}</td>

            <td>${report.body.substring(0,50)}...</td>

            <td>

                <span class="badge bg-success">

                    Completed

                </span>

            </td>

        </tr>
        `;

    });

    document.getElementById("pageNumber").innerHTML = currentPage;

}

// Search
searchInput.addEventListener("keyup", () => {

    currentPage = 1;

    renderReports();

});

// Pagination
document.getElementById("prevBtn").addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        renderReports();

    }

});

document.getElementById("nextBtn").addEventListener("click", () => {

    let keyword = searchInput.value.toLowerCase();

    let filtered = reports.filter(report =>
        report.title.toLowerCase().includes(keyword) ||
        report.body.toLowerCase().includes(keyword)
    );

    if (currentPage < Math.ceil(filtered.length / reportsPerPage)) {

        currentPage++;

        renderReports();

    }

});

// Logout
function logout() {

    localStorage.removeItem("user");

    window.location.href = "login.html";

}