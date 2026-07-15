const form = document.getElementById("studentForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const student = {
        id: Date.now(),
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        attendance: document.getElementById("attendance").value,
        performance: document.getElementById("performance").value,
        status: document.getElementById("status").value
    };

    students.push(student);

    saveStudents();

    renderStudents();

    form.reset();
});

renderStudents();