// Student Data

let students = JSON.parse(localStorage.getItem("students")) || [];

// Save Data

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

// Display Students

function displayStudents(studentList = students) {

    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    studentList.forEach((student, index) => {

        table.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.attendance}%</td>
                <td>${student.performance}%</td>
                <td>${student.status}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">
                        Edit
                    </button>

                    <button class="delete-btn" onclick="deleteStudent(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    updateDashboard();
}