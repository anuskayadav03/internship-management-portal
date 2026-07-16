let students = [];
let filteredStudents = [];
let currentPage = 1;
const studentsPerPage = 10;

// HTML Elements
const studentContainer = document.getElementById("studentContainer");
const searchInput = document.getElementById("searchInput");
const filterCompany = document.getElementById("filterCompany");
const loading = document.getElementById("loading");
const pageNumber = document.getElementById("pageNumber");

// Load Students
async function loadStudents() {
    try {
        students = await fetchUsers();
        filteredStudents = students;

        populateCompanies();
        displayStudents();
    } catch (error) {
        studentContainer.innerHTML =
            "<h3 class='text-danger text-center'>Failed to load students.</h3>";
    } finally {
        loading.style.display = "none";
    }
}

// Display Students
function displayStudents() {
    studentContainer.innerHTML = "";

    const start = (currentPage - 1) * studentsPerPage;
    const end = start + studentsPerPage;

    const pageStudents = filteredStudents.slice(start, end);

    pageStudents.forEach(student => {
        studentContainer.innerHTML += `
        <div class="col-md-4">
            <div class="card shadow h-100 student-card">
                <div class="card-body text-center">
                    <img src="${student.image}" class="img-fluid rounded-circle mb-3" width="120">
                    <h5>${student.firstName} ${student.lastName}</h5>
                    <p>${student.email}</p>
                    <p>${student.phone}</p>
                    <p><strong>${student.company.name}</strong></p>
                </div>
            </div>
        </div>
        `;
    });

    pageNumber.textContent = currentPage;
}

// Company Filter
function populateCompanies() {
    const companies = [...new Set(students.map(student => student.company.name))];

    companies.forEach(company => {
        filterCompany.innerHTML += `
            <option value="${company}">${company}</option>
        `;
    });
}

// Search
searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    filteredStudents = students.filter(student =>
        (`${student.firstName} ${student.lastName}`)
        .toLowerCase()
        .includes(keyword)
    );

    currentPage = 1;
    displayStudents();
});

// Filter
filterCompany.addEventListener("change", () => {
    const company = filterCompany.value;

    if (company === "") {
        filteredStudents = students;
    } else {
        filteredStudents = students.filter(student =>
            student.company.name === company
        );
    }

    currentPage = 1;
    displayStudents();
});

// Pagination
document.getElementById("nextBtn").addEventListener("click", () => {
    if ((currentPage * studentsPerPage) < filteredStudents.length) {
        currentPage++;
        displayStudents();
    }
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayStudents();
    }
});

// Start
loadStudents();