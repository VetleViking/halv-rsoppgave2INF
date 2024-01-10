window.onload = async function() {
    let loggedIn = await isLoggedIn();

    if (!loggedIn) {
        window.location.replace("/loginAdmin.html");
    }

};

document.getElementById("addUserBtn").addEventListener("click", async function () {
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;

    let addUser = await fetch("/addUser/" + name + "/" + password);
});

document.getElementById("addElevBtn").addEventListener("click", async function () {
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;

    let addUser = await fetch("/addUser/" + name + "/" + password);
});

document.getElementById("addLærerBtn").addEventListener("click", async function () {
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;

    let addUser = await fetch("/addUser/" + name + "/" + password);
});