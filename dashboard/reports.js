const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user.isLoggedIn) {
    window.location.href = "login.html";
}

let reports = [];
let currentPage = 1;
const perPage = 10;

const table = document.getElementById("reportTable");
const loading = document.getElementById("loading");

async function loadReports() {

    loading.style.display = "block";

    reports = await fetchReports();

    loading.style.display = "none";

    renderReports();

}

loadReports();

function renderReports() {

    table.innerHTML = "";

    const keyword = document.getElementById("searchReport").value.toLowerCase();

    const filtered = reports.filter(report =>
        report.title.toLowerCase().includes(keyword)
    );

    const start = (currentPage - 1) * perPage;

    const end = start + perPage;

    filtered.slice(start, end).forEach(report => {

        table.innerHTML += `

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

document.getElementById("searchReport").addEventListener("keyup", () => {

    currentPage = 1;

    renderReports();

});

document.getElementById("prevBtn").addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        renderReports();

    }

});

document.getElementById("nextBtn").addEventListener("click", () => {

    currentPage++;

    renderReports();

});

function logout() {

    localStorage.removeItem("user");

    window.location.href = "login.html";

}