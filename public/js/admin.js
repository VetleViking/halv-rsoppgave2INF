window.onload = async function () {
    let loggedIn = await isLoggedIn();

    if (!loggedIn) {
        window.location.replace("/loginAdmin.html");
    }

    onEnter(document.getElementById("name"), addUser);
    onEnter(document.getElementById("password"), addUser);
    onEnter(document.getElementById("studentName"), addElev);
    onEnter(document.getElementById("teacherName"), addLærer);
    onEnter(document.getElementById("RMlærer"), rmLærer);
    onEnter(document.getElementById("RMelev"), rmElev);
    onEnter(document.getElementById("RMuser"), rmUser);

    let allTeachers = await fetch("/allTeachers");
    allTeachers = await allTeachers.json();

    allTeachers.forEach(function (teacher) {
        let html = document.createElement("p");
        html.classList.add("teacher");
        html.innerHTML = teacher.name;
        document.getElementById("teachersDiv").appendChild(html);
    });

    let lærerNavn = document.getElementById("RMlærer");
    let teachersDiv = document.getElementById("teachersDiv");
    let teachers = Array.from(document.getElementsByClassName("teacher"));
    filterDropdown(lærerNavn, teachersDiv, teachers);

    let allStudents = await fetch("/allStudents");
    allStudents = await allStudents.json();

    allStudents.forEach(function (student) {
        let html = document.createElement("p");
        html.classList.add("student");
        html.innerHTML = student.name;
        document.getElementById("studentsDiv").appendChild(html);
    });

    let elevNavn = document.getElementById("RMelev");
    let studentsDiv = document.getElementById("studentsDiv");
    let students = Array.from(document.getElementsByClassName("student"));
    filterDropdown(elevNavn, studentsDiv, students);

    let allUsers = await fetch("/allUsers");
    allUsers = await allUsers.json();

    allUsers.forEach(function (user) {
        let html = document.createElement("p");
        html.classList.add("user");
        html.innerHTML = user.name;
        document.getElementById("usersDiv").appendChild(html);
    });

    let user = document.getElementById("RMuser");
    let usersDiv = document.getElementById("usersDiv");
    let users = Array.from(document.getElementsByClassName("user"));
    filterDropdown(user, usersDiv, users);
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

document.getElementById("rmTeacherBtn").addEventListener("click", function () {
    rmLærer();
});

document.getElementById("rmStudentBtn").addEventListener("click", function () {
    rmElev();
});

document.getElementById("rmUserBtn").addEventListener("click", function () {
    rmUser();
});

async function rmLærer() {
    let name = document.getElementById("RMlærer").value;

    if (name == "") {
        document.getElementById("errorTeacher").innerHTML = "Du må skrive inn et navn";
        return;
    }

    let allTeachers = await fetch("/allTeachers");
    allTeachers = await allTeachers.json();

    let teacherExists = false;
    allTeachers.forEach(function (teacher) {
        if (teacher.name == name) {
            teacherExists = true;
        }
    });

    if (!teacherExists) {
        document.getElementById("errorTeacher").innerHTML = "Læreren finnes ikke";
        return;
    }

    let rmTeacher = await fetch("/rmTeacher/" + name);
    rmTeacher = await rmTeacher.json();

    if (rmTeacher.login) {
        localStorage.setItem("ferdigTilbake", "admin");
        localStorage.setItem("ferdigTilbakeText", "Admin");
        localStorage.setItem("ferdigText", "Læreren ble fjernet");
        window.location.replace("/ferdig.html");
    } else {
        window.location.replace("/loginAdmin.html");
    }
}

async function rmElev() {
    let name = document.getElementById("RMelev").value;

    if (name == "") {
        document.getElementById("errorStudent").innerHTML = "Du må skrive inn et navn";
        return;
    }

    let allStudents = await fetch("/allStudents");
    allStudents = await allStudents.json();

    let studentExists = false;
    allStudents.forEach(function (student) {
        if (student.name == name) {
            studentExists = true;
        }
    });

    if (!studentExists) {
        document.getElementById("errorStudent").innerHTML = "Eleven finnes ikke";
        return;
    }

    let rmStudent = await fetch("/rmStudent/" + name);
    rmStudent = await rmStudent.json();

    if (rmStudent.login) {
        localStorage.setItem("ferdigTilbake", "admin");
        localStorage.setItem("ferdigTilbakeText", "Admin");
        localStorage.setItem("ferdigText", "Eleven ble fjernet");
        window.location.replace("/ferdig.html");
    } else {
        window.location.replace("/loginAdmin.html");
    }
}

async function rmUser() {
    let name = document.getElementById("RMuser").value;

    if (name == "") {
        document.getElementById("errorUser").innerHTML = "Du må skrive inn et navn";
        return;
    }

    let allUsers = await fetch("/allUsers");
    allUsers = await allUsers.json();

    let userExists = false;
    allUsers.forEach(function (user) {
        if (user.name == name) {
            userExists = true;
        }
    });

    if (!userExists) {
        document.getElementById("errorUser").innerHTML = "Brukeren finnes ikke";
        return;
    }

    let rmUser = await fetch("/rmUser/" + name);
    rmUser = await rmUser.json();

    if (rmUser.login) {
        localStorage.setItem("ferdigTilbake", "admin");
        localStorage.setItem("ferdigTilbakeText", "Admin");
        localStorage.setItem("ferdigText", "Brukeren ble fjernet");
        window.location.replace("/ferdig.html");
    } else {
        window.location.replace("/loginAdmin.html");
    }
}

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
    input.addEventListener("focus", function () {
        if (input.id == "RMlærer") {
            document.getElementById("errorTeacher").innerHTML = "";
        } else if (input.id == "RMelev") {
            document.getElementById("errorStudent").innerHTML = "";
        } else if (input.id == "RMuser") {
            document.getElementById("errorUser").innerHTML = "";
        }
        filterSearch2(input, items);
        dropdown.style.display = "block";
    });

    input.addEventListener("blur", function () {
        setTimeout(function () {
            dropdown.style.display = "none";
        }, 100);
    });

    input.addEventListener("keyup", function () {
        filterSearch2(input, items);
    });

    items.forEach(function (item) {
        item.addEventListener("click", function () {
            input.value = item.textContent;
            dropdown.style.display = "none";
        });
    });
}

function filterSearch2(input, items) {
    let search = input.value.toLowerCase();
    items.forEach(function (item) {
        let text = item.textContent.toLowerCase();
        if (text.indexOf(search) > -1) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}
