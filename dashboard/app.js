// Wait until page loads

window.onload = function () {

    const loading = document.getElementById("loading");

    setTimeout(() => {
        loading.classList.add("hidden");
    }, 1000);

};

// Form Submit

document.getElementById("studentForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const index = document.getElementById("studentIndex").value;

    const student = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        attendance: document.getElementById("attendance").value,

        performance: document.getElementById("performance").value,

        status: document.getElementById("status").value

    };

    if (!validateStudent(
        student.name,
        student.email,
        student.attendance,
        student.performance
    )) {
        return;
    }

    if (index === "") {
        addStudent(student);
        showSuccess("Student added successfully.");
    } else {
        updateStudent(index, student);
        showSuccess("Student updated successfully.");
    }

    clearForm();

});

// Search Students

document.getElementById("search").addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(value)
    );

    displayStudents(filtered);

});

// Filter by Status

document.getElementById("filterStatus").addEventListener("change", function () {

    const status = this.value;

    if (status === "All") {
        displayStudents();
        return;
    }

    const filtered = students.filter(student =>
        student.status === status
    );

    displayStudents(filtered);

});

// Sort Students

document.getElementById("sortBy").addEventListener("change", function () {

    const value = this.value;

    if (value === "name") {

        students.sort((a, b) => a.name.localeCompare(b.name));

    } else if (value === "attendance") {

        students.sort((a, b) => b.attendance - a.attendance);

    } else if (value === "performance") {

        students.sort((a, b) => b.performance - a.performance);

    }

    saveStudents();

    displayStudents();

});

// Export JSON

document.getElementById("exportBtn").addEventListener("click", function () {

    const data = JSON.stringify(students, null, 2);

    const blob = new Blob([data], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "students.json";

    a.click();

});

// Import JSON

document.getElementById("importFile").addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        try {

            students = JSON.parse(event.target.result);

            saveStudents();

            displayStudents();

            alert("Student data imported successfully.");

        } catch (error) {

            showError("Invalid JSON file.");

        }

    };

    reader.readAsText(file);

});