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
// Add Student

function addStudent(student) {

    students.push(student);

    saveStudents();

    displayStudents();

}

// Edit Student

function editStudent(index) {

    const student = students[index];

    document.getElementById("studentIndex").value = index;
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("attendance").value = student.attendance;
    document.getElementById("performance").value = student.performance;
    document.getElementById("status").value = student.status;

}
// Update Student

function updateStudent(index, student) {

    students[index] = student;

    saveStudents();

    displayStudents();

}

// Delete Student

function deleteStudent(index) {

    const confirmDelete = confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) {
        return;
    }

    students.splice(index, 1);

    saveStudents();

    displayStudents();

}

// Show data on page load

displayStudents();