document.getElementById("loginBtn").addEventListener("click", async function () {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let login = await fetch("/login/" + user + "/" + pass);

    login = await login.json();

    console.log(login);

    // if (login) {
    //     window.location.replace("/admin.html");
    // } else {
    //     alert("Feil brukernavn eller passord");
    // }
});