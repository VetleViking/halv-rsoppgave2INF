window.onload = async function() {
    let loggedIn = await isLoggedIn();

    if (!loggedIn) {
        window.location.replace("/loginAdmin.html");
    }

    onEnter(document.getElementById("name"), addUser);
    onEnter(document.getElementById("password"), addUser);
    onEnter(document.getElementById("studentName"), addElev);
    onEnter(document.getElementById("teacherName"), addLærer);
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
        return;
    }

    let addUser = await fetch("/addUser/" + name + "/" + password);

    addUser = await addUser.json();

    if (addUser.exists) {
        console.log("Det finnes en bruker med samme navn allerede");
    } else if (addUser.login) {
        console.log("Brukeren ble lagt til");
    } else {
        console.log("Du er ikke logget inn");
    }
} 

async function addElev() {
    let name = document.getElementById("studentName").value;

    let addUser = await fetch("/addStudent/" + name);
}

async function addLærer() {
    let name = document.getElementById("teacherName").value;

    let addUser = await fetch("/addTeacher/" + name);
}
