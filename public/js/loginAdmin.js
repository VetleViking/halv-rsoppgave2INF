window.addEventListener("load", async function () {
    let loggedIn = await isLoggedIn();

    console.log(loggedIn);

    if (loggedIn) {
        window.location.replace("/admin.html");
    }

    onEnter(document.getElementById("username"), logIn);
    onEnter(document.getElementById("password"), logIn);
});

document.getElementById("loginBtn").addEventListener("click", async function () {
    await logIn();
});

async function logIn() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user == "" || pass == "") {
        return;
    }

    let loggedIn = await fetch("/login/" + user + "/" + pass);

    loggedIn = await loggedIn.json();

    console.log(loggedIn);

    if (loggedIn.login) {
        window.location.replace("/admin.html");
    } else if (loggedIn.user == null) {
       document.getElementById("errorMsg").innerHTML = "Brukeren finnes ikke";
    } else {
        document.getElementById("errorMsg").innerHTML = "Feil passord";
    }
}