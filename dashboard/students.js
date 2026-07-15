let students = JSON.parse(localStorage.getItem("students")) || [];

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}
function renderStudents() {

    const tbody = document.getElementById("studentTableBody");

    tbody.innerHTML = "";

    students.forEach(student => {

        tbody.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.attendance}%</td>
                <td>${student.performance}</td>
                <td>${student.status}</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
        `;

    });

}