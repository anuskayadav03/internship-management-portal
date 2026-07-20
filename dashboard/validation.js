
function validateStudent(name, email, attendance, performance) {

    if (name.trim() === "") {
        alert("Student name is required.");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (
        attendance === "" ||
        attendance < 0 ||
        attendance > 100
    ) {
        alert("Attendance must be between 0 and 100.");
        return false;
    }

    if (
        performance === "" ||
        performance < 0 ||
        performance > 100
    ) {
        alert("Performance must be between 0 and 100.");
        return false;
    }

    return true;
}


function clearForm() {

    document.getElementById("studentForm").reset();

    document.getElementById("studentIndex").value = "";

}


function showError(message) {

    console.error(message);

    alert(message);

}


function showSuccess(message) {

    alert(message);

}