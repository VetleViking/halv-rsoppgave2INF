window.addEventListener("load", async function () {
    let id = localStorage.getItem("id");

    if (id == null) {
        window.location.replace("/utlån.html");
    }

    let utstyr = await fetch("/get/" + id);
    utstyr = await utstyr.json();

    let date = new Date();
    
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    date = date.toISOString();

    let html = document.createElement("div");

    html.innerHTML = `
    <div class="listItem listItemUV"><p>${utstyr.name}</p></div>
    <div class="listItem listItemUV"><p>${utstyr.id}</p></div>
    <div class="listItem listItemUV"><p>${day + "." + month + "." + year}</p></div>`;

    html.classList.add("listDiv");
    html.classList.add("listDivUV");

    document.getElementById("allEquipment").appendChild(html);

    onEnter(document.getElementById("ansvarlig"), loanOut);
    onEnter(document.getElementById("låntaker"), loanOut);

    document.getElementById("yesBtn").addEventListener("click", async function () {
        await loanOut();
    });

    document.getElementById("noBtn").addEventListener("click", async function () {
        localStorage.removeItem("id");
        window.location.replace("/utlån.html");
    });

    let allTeachers = await fetch("/allTeachers");
    allTeachers = await allTeachers.json();

    allTeachers.forEach(function (teacher) {
        let html = document.createElement("p");
        html.classList.add("teacher");
        html.innerHTML = teacher.name;
        document.getElementById("teachersDiv").appendChild(html);
    });

    let allStudents = await fetch("/allStudents");
    allStudents = await allStudents.json();

    allStudents.forEach(function (student) {
        let html = document.createElement("p");
        html.classList.add("student");
        html.innerHTML = student.name;
        document.getElementById("studentsDiv").appendChild(html);
    });

    let ansvarlig = document.getElementById('ansvarlig');
    let teachersDiv = document.getElementById('teachersDiv');
    let teachers = Array.from(document.getElementsByClassName('teacher'));
    filterDropdown(ansvarlig, teachersDiv, teachers);

    let låntaker = document.getElementById('låntaker');
    let studentsDiv = document.getElementById('studentsDiv');
    let students = Array.from(document.getElementsByClassName('student'));
    filterDropdown(låntaker, studentsDiv, students);

});

async function loanOut() {
    let ansvarlig = document.getElementById("ansvarlig").value;
    let låntaker = document.getElementById("låntaker").value;

    let id = localStorage.getItem("id");

    let date = new Date();
    date = date.toISOString();

    //checks if teacher and student exists in db
    let allTeachers = await fetch("/allTeachers");
    allTeachers = await allTeachers.json();

    let teacherExists = false;
    allTeachers.forEach(function (teacher) {
        if (teacher.name == ansvarlig) {
            teacherExists = true;
            return;
        }
    });

    if (!teacherExists) {
        document.getElementById("errorTeacher").innerHTML = "<p>Læreren finnes ikke.</p>";
        return;
    }

    let allStudents = await fetch("/allStudents");
    allStudents = await allStudents.json();

    let studentExists = false;
    allStudents.forEach(function (student) {
        if (student.name == låntaker) {
            studentExists = true;
            return;
        }
    });

    if (!studentExists) {
        document.getElementById("errorStudent").innerHTML = "<p>Eleven finnes ikke.</p>";
        return;
    }

    //updates item in db
    localStorage.removeItem("id");
    await fetch("/modify/" + id + "/utleid/true");
    await fetch("/modify/" + id + "/utlånsdato/" + date);
    await fetch("/modify/" + id + "/ansvarlig/" + ansvarlig);
    await fetch("/modify/" + id + "/låntaker/" + låntaker);

    localStorage.setItem("ferdigTilbake", "utlån");
    localStorage.setItem("ferdigTilbakeText", "Utlån");
    localStorage.setItem("ferdigText", "Utlånet er registrert.");
    window.location.replace("/ferdig.html");
}

function filterDropdown(input, dropdown, items) {    

    input.addEventListener('focus', function() {
        document.getElementById("errorTeacher").innerHTML = "";
        document.getElementById("errorStudent").innerHTML = "";
        filterSearch(input, items);
        dropdown.style.display = 'block';
    });

    input.addEventListener('blur',function() {
        setTimeout(function() {
            dropdown.style.display = 'none';

        }, 100);
    });

    input.addEventListener('keyup', function() {
        filterSearch(input, items);
    });

    items.forEach(function(item) {
        item.addEventListener('click', function() {
            input.value = item.textContent;
            dropdown.style.display = 'none';
        });
    });
}

function filterSearch(input, items) {
    let search = input.value.toLowerCase();
    items.forEach(function(item) {
        let text = item.textContent.toLowerCase();
        if (text.indexOf(search) > -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}