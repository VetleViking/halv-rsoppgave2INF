window.onload = async function() {
    let loggedIn = await isLoggedIn();

    if (!loggedIn) {
        window.location.replace("/loginAdmin.html");
    }

    onEnter(document.getElementById("name"), addUser);
    onEnter(document.getElementById("password"), addUser);
    onEnter(document.getElementById("studentName"), addElev);
    onEnter(document.getElementById("teacherName"), addLærer);

    let allTeachers = await fetch("/allTeachers");
    allTeachers = await allTeachers.json();

    allTeachers.forEach(function (teacher) {
        let html = document.createElement("p");
        html.classList.add("teacher");
        html.innerHTML = teacher.name;
        document.getElementById("teachersDiv").appendChild(html);
    });

    let ansvarlig = document.getElementById('ansvarlig');
    let teachersDiv = document.getElementById('teachersDiv');
    let teachers = Array.from(document.getElementsByClassName('teacher'));
    filterDropdown(ansvarlig, teachersDiv, teachers);
};

document.getElementById("addUserBtn").addEventListener("click", async function () {
    addUser();
});

document.getElementById("addElevBtn").addEventListener("click", async function () {
    addElev();
});

document.getElementById("addLærerBtn").addEventListener("click", async function () {
    addLærer();
});

async function addUser() {
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;

    if (name == "" || password == "") {
        document.getElementById("addErr").innerHTML = "Du må fylle ut alle feltene";
        return;
    }

    let addUser = await fetch("/addUser/" + name + "/" + password);

    addUser = await addUser.json();

    let addUserErr = document.getElementById("addErr");
    if (addUser.exists) {
        addUserErr.innerHTML = "Det finnes en bruker med samme navn allerede";
    } else if (addUser.login) {
        localStorage.setItem("ferdigTilbake", "admin");
        localStorage.setItem("ferdigTilbakeText", "Admin");
        localStorage.setItem("ferdigText", "Brukeren ble lagt til");
        window.location.replace("/ferdig.html");
    } else {
        addUserErr.innerHTML = "Du er ikke logget inn";
        window.location.replace("/loginAdmin.html");
    }
} 

async function addElev() {
    let name = document.getElementById("studentName").value;
    if (name == "") {
        document.getElementById("addStudentErr").innerHTML = "Du må skrive inn et navn";
        return;
    } 

    let addUser = await fetch("/addStudent/" + name);
    addUser = await addUser.json();

    if (addUser.login) {
        localStorage.setItem("ferdigTilbake", "admin");
        localStorage.setItem("ferdigTilbakeText", "Admin");
        localStorage.setItem("ferdigText", "Eleven ble lagt til");
        window.location.replace("/ferdig.html");
    } else {
        window.location.replace("/loginAdmin.html");
    }
}

async function addLærer() {
    let name = document.getElementById("teacherName").value;
    if (name == "") {
        document.getElementById("addTeacherErr").innerHTML = "Du må skrive inn et navn";
        return;
    } 

    let addUser = await fetch("/addTeacher/" + name);
    addUser = await addUser.json();

    if (addUser.login) {
        localStorage.setItem("ferdigTilbake", "admin");
        localStorage.setItem("ferdigTilbakeText", "Admin");
        localStorage.setItem("ferdigText", "Læreren ble lagt til");
        window.location.replace("/ferdig.html");
    } else {
        window.location.replace("/loginAdmin.html");
    }
}


function filterDropdown(input, dropdown, items) {   
    console.log("filterDropdown"); 

    input.addEventListener('focus', function() {
        document.getElementById("errorTeacher").innerHTML = "";
        filterSearch2(input, items);
        dropdown.style.display = 'block';
    });

    input.addEventListener('blur',function() {
        setTimeout(function() {
            dropdown.style.display = 'none';

        }, 100);
    });

    input.addEventListener('keyup', function() {
        filterSearch2(input, items);
    });

    items.forEach(function(item) {
        item.addEventListener('click', function() {
            input.value = item.textContent;
            dropdown.style.display = 'none';
        });
    });
}

function filterSearch2(input, items) {
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