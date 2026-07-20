// Login Check
const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user.isLoggedIn) {
    window.location.href = "login.html";
}

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

const tbody = document.getElementById("studentBody");
const table = document.getElementById("studentTable");
const loading = document.getElementById("loading");
const toast = document.getElementById("toast");

let currentPage = 1;
const perPage = 5;

// Default Students
if (students.length === 0) {

    students = [
        {id:1,name:"Rahul Sharma",email:"rahul@gmail.com",status:"active"},
        {id:2,name:"Priya Singh",email:"priya@gmail.com",status:"active"},
        {id:3,name:"Rohit Kumar",email:"rohit@gmail.com",status:"inactive"},
        {id:4,name:"Anjali Gupta",email:"anjali@gmail.com",status:"active"},
        {id:5,name:"Sneha Patel",email:"sneha@gmail.com",status:"inactive"},
        {id:6,name:"Aman Verma",email:"aman@gmail.com",status:"active"}
    ];

    saveStudents();
}

function saveStudents(){
    localStorage.setItem("students",JSON.stringify(students));
}

function showToast(msg){

    toast.innerHTML = msg;

    toast.classList.remove("d-none");

    setTimeout(function(){

        toast.classList.add("d-none");

    },2000);

}

function renderStudents(){

    loading.classList.remove("d-none");

    table.classList.add("d-none");

    setTimeout(function(){

        loading.classList.add("d-none");

        table.classList.remove("d-none");

        tbody.innerHTML = "";

        let keyword = document.getElementById("searchInput").value.toLowerCase();

        let status = document.getElementById("filterStatus").value;

        let filtered = students.filter(function(student){

            let search = student.name.toLowerCase().includes(keyword) ||
                         student.email.toLowerCase().includes(keyword);

            let filter = status==="all" || student.status===status;

            return search && filter;

        });

        let start = (currentPage-1)*perPage;

        let end = start + perPage;

        filtered.slice(start,end).forEach(function(student){

            tbody.innerHTML += `

            <tr>

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>${student.status}</td>

            <td>

            <button class="btn btn-warning btn-sm" onclick="editStudent(${student.id})">

            Edit

            </button>

            <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">

            Delete

            </button>

            </td>

            </tr>

            `;

        });

        document.getElementById("pageNumber").innerHTML=currentPage;

    },500);

}

renderStudents();

function saveStudent(){

    let name=document.getElementById("studentName").value.trim();

    let email=document.getElementById("studentEmail").value.trim();

    let status=document.getElementById("studentStatus").value;

    if(name===""||email===""){

        alert("Fill all fields");

        return;

    }

    if(editIndex==-1){

        students.push({

            id:Date.now(),

            name,

            email,

            status

        });

        showToast("Student Added");

    }else{

        students[editIndex].name=name;
        students[editIndex].email=email;
        students[editIndex].status=status;

        editIndex=-1;

        showToast("Student Updated");

    }

    saveStudents();

    renderStudents();

    document.getElementById("studentName").value="";
    document.getElementById("studentEmail").value="";
}

function editStudent(id){

    editIndex = students.findIndex(function(student){

        return student.id===id;

    });

    document.getElementById("studentName").value=students[editIndex].name;

    document.getElementById("studentEmail").value=students[editIndex].email;

    document.getElementById("studentStatus").value=students[editIndex].status;

    new bootstrap.Modal(document.getElementById("studentModal")).show();

}

function deleteStudent(id){

    if(confirm("Delete Student?")){

        students = students.filter(function(student){

            return student.id!==id;

        });

        saveStudents();

        renderStudents();

        showToast("Student Deleted");

    }

}

document.getElementById("searchInput").addEventListener("keyup",function(){

    currentPage=1;

    renderStudents();

});

document.getElementById("filterStatus").addEventListener("change",function(){

    currentPage=1;

    renderStudents();

});

document.getElementById("prevBtn").addEventListener("click",function(){

    if(currentPage>1){

        currentPage--;

        renderStudents();

    }

});

document.getElementById("nextBtn").addEventListener("click",function(){

    currentPage++;

    renderStudents();

});

function exportStudents(){

    const blob = new Blob([JSON.stringify(students,null,2)],{

        type:"application/json"

    });

    const url = URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="students.json";

    a.click();

}

document.getElementById("importFile").addEventListener("change",function(e){

    const file=e.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=function(event){

        students=JSON.parse(event.target.result);

        saveStudents();

        renderStudents();

        showToast("Students Imported");

    }

    reader.readAsText(file);

});

function logout(){

    localStorage.removeItem("user");

    window.location.href="login.html";

}