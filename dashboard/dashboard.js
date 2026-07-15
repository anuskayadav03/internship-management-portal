// Update Dashboard Statistics

function updateDashboard() {

    const totalStudents = students.length;

    const activeStudents = students.filter(student =>
        student.status === "Active"
    ).length;

    const inactiveStudents = students.filter(student =>
        student.status === "Inactive"
    ).length;

    let totalAttendance = 0;

    students.forEach(student => {
        totalAttendance += Number(student.attendance);
    });

    const averageAttendance =
        totalStudents > 0
            ? (totalAttendance / totalStudents).toFixed(1)
            : 0;

    document.getElementById("totalStudents").textContent = totalStudents;

    document.getElementById("activeStudents").textContent = activeStudents;

    document.getElementById("inactiveStudents").textContent = inactiveStudents;

    document.getElementById("avgAttendance").textContent =
        averageAttendance + "%";

    updateAnalytics();
}

// Dashboard Analytics

function updateAnalytics() {

    if (students.length === 0) {

        document.getElementById("topPerformer").textContent = "-";

        document.getElementById("highestAttendance").textContent = "-";

        return;
    }

    let topPerformer = students[0];

    let highestAttendance = students[0];

    students.forEach(student => {

        if (
            Number(student.performance) >
            Number(topPerformer.performance)
        ) {
            topPerformer = student;
        }

        if (
            Number(student.attendance) >
            Number(highestAttendance.attendance)
        ) {
            highestAttendance = student;
        }

    });

    document.getElementById("topPerformer").textContent =
        `${topPerformer.name} (${topPerformer.performance}%)`;

    document.getElementById("highestAttendance").textContent =
        `${highestAttendance.name} (${highestAttendance.attendance}%)`;
}

// Show dashboard when page loads

updateDashboard();