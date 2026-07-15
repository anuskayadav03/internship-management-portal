let students = JSON.parse(localStorage.getItem("students")) || [];

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}