let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;
let currentPage = 1;
const perPage = 5;

const tbody = document.getElementById("studentBody");
const table = document.getElementById("studentTable");
const loading = document.getElementById("loading");
const toast = document.getElementById("toast");

// Default Data
if (students.length === 0) {

students = [

{
id:1,
name:"Rahul Sharma",
email:"rahul@gmail.com",
status:"active"
},

{
id:2,
name:"Priya Singh",
email:"priya@gmail.com",
status:"active"
},

{
id:3,
name:"Aman Verma",
email:"aman@gmail.com",
status:"inactive"
},

{
id:4,
name:"Sneha Patel",
email:"sneha@gmail.com",
status:"active"
},

{
id:5,
name:"Rohit Kumar",
email:"rohit@gmail.com",
status:"inactive"
},

{
id:6,
name:"Anjali Gupta",
email:"anjali@gmail.com",
status:"active"
}

];

saveStorage();

}

function saveStorage(){

localStorage.setItem("students",JSON.stringify(students));

}

function showToast(message){

toast.innerHTML=message;

toast.classList.remove("d-none");

setTimeout(()=>{

toast.classList.add("d-none");

},2000);

}

function renderStudents(){

loading.classList.remove("d-none");

table.classList.add("d-none");

setTimeout(()=>{

loading.classList.add("d-none");

table.classList.remove("d-none");

tbody.innerHTML="";

let keyword=document.getElementById("searchInput").value.toLowerCase();

let status=document.getElementById("filterStatus").value;

let filtered=students.filter(student=>{

let searchMatch=student.name.toLowerCase().includes(keyword)||student.email.toLowerCase().includes(keyword);

let statusMatch=status==="all"||student.status===status;

return searchMatch&&statusMatch;

});

let start=(currentPage-1)*perPage;

let end=start+perPage;

filtered.slice(start,end).forEach((student,index)=>{

tbody.innerHTML+=`

<tr>

<td>${student.id}</td>

<td>${student.name}</td>

<td>${student.email}</td>

<td>${student.status}</td>

<td>

<button class="btn btn-warning btn-sm" onclick="editStudent(${students.indexOf(student)})">

Edit

</button>

<button class="btn btn-danger btn-sm" onclick="deleteStudent(${students.indexOf(student)})">

Delete

</button>

</td>

</tr>

`;

});

document.getElementById("pageNumber").innerHTML=currentPage;

},600);

}

renderStudents();

function saveStudent(){

const name=document.getElementById("studentName").value.trim();

const email=document.getElementById("studentEmail").value.trim();

const status=document.getElementById("studentStatus").value;

if(name===""||email===""){

alert("Please fill all fields.");

return;

}

if(editIndex==-1){

students.push({

id:students.length+1,

name,

email,

status

});

showToast("Student Added");

}else{

students[editIndex]={

id:students[editIndex].id,

name,

email,

status

};

showToast("Student Updated");

editIndex=-1;

}

saveStorage();

renderStudents();

document.getElementById("studentName").value="";

document.getElementById("studentEmail").value="";

}

function editStudent(index){

editIndex=index;

document.getElementById("studentName").value=students[index].name;

document.getElementById("studentEmail").value=students[index].email;

document.getElementById("studentStatus").value=students[index].status;

new bootstrap.Modal(document.getElementById("studentModal")).show();

}

function deleteStudent(index){

if(confirm("Delete this student?")){

students.splice(index,1);

saveStorage();

renderStudents();

showToast("Student Deleted");

}

}

document.getElementById("searchInput").addEventListener("keyup",()=>{

currentPage=1;

renderStudents();

});

document.getElementById("filterStatus").addEventListener("change",()=>{

currentPage=1;

renderStudents();

});

document.getElementById("prevBtn").addEventListener("click",()=>{

if(currentPage>1){

currentPage--;

renderStudents();

}

});

document.getElementById("nextBtn").addEventListener("click",()=>{

let filtered=students.filter(student=>{

let keyword=document.getElementById("searchInput").value.toLowerCase();

let status=document.getElementById("filterStatus").value;

let searchMatch=student.name.toLowerCase().includes(keyword)||student.email.toLowerCase().includes(keyword);

let statusMatch=status==="all"||student.status===status;

return searchMatch&&statusMatch;

});

if(currentPage<Math.ceil(filtered.length/perPage)){

currentPage++;

renderStudents();

}

});

function exportStudents(){

const dataStr=JSON.stringify(students,null,2);

const blob=new Blob([dataStr],{type:"application/json"});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="students.json";

a.click();

URL.revokeObjectURL(url);

}

document.getElementById("importFile").addEventListener("change",function(){

const file=this.files[0];

if(!file)return;

const reader=new FileReader();

reader.onload=function(e){

students=JSON.parse(e.target.result);

saveStorage();

renderStudents();

showToast("Students Imported");

}

reader.readAsText(file);

});

function logout(){

localStorage.removeItem("user");

window.location.href="login.html";

}