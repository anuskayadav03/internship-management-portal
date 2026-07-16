let reports = [];
let filteredReports = [];
let currentPage = 1;
const reportsPerPage = 10;

// Elements
const reportTable = document.getElementById("reportTable");
const searchReport = document.getElementById("searchReport");
const loading = document.getElementById("loading");
const pageNumber = document.getElementById("pageNumber");

// Load Reports
async function loadReports() {
    try {
        reports = await fetchReports();
        filteredReports = reports;

        displayReports();

    } catch (error) {
        reportTable.innerHTML =
            "<tr><td colspan='4' class='text-center text-danger'>Failed to load reports.</td></tr>";
    } finally {
        loading.style.display = "none";
    }
}

// Display Reports
function displayReports() {
    reportTable.innerHTML = "";

    const start = (currentPage - 1) * reportsPerPage;
    const end = start + reportsPerPage;

    const pageData = filteredReports.slice(start, end);

    pageData.forEach(report => {

        const status = report.id % 2 === 0 ? "Completed" : "Pending";

        reportTable.innerHTML += `
        <tr>
            <td>${report.id}</td>
            <td>${report.title}</td>
            <td>${report.body}</td>
            <td>${status}</td>
        </tr>
        `;
    });

    pageNumber.textContent = currentPage;
}

// Search
searchReport.addEventListener("input", () => {

    const keyword = searchReport.value.toLowerCase();

    filteredReports = reports.filter(report =>
        report.title.toLowerCase().includes(keyword)
    );

    currentPage = 1;
    displayReports();

});

// Next Page
document.getElementById("nextBtn").addEventListener("click", () => {

    if (currentPage * reportsPerPage < filteredReports.length) {
        currentPage++;
        displayReports();
    }

});

// Previous Page
document.getElementById("prevBtn").addEventListener("click", () => {

    if (currentPage > 1) {
        currentPage--;
        displayReports();
    }

});

// Start
loadReports();