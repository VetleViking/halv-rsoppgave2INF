window.addEventListener("load", async function () {
    let loggedIn = await isLoggedIn();

    if (!loggedIn) {
        window.location.replace("/loginAdmin.html");
    }
});

document.getElementById("btn").addEventListener("click", async function () {
    let name = document.getElementById("name").value;
    let shelf = document.getElementById("shelf").value;
    let row = document.getElementById("row").value;

    if (name == "" || shelf == "" || row == "") {
        document.getElementById("errorMsg").innerHTML = "Du må fylle ut alle feltene";
        return;
    }

    let utstyr = await fetch("/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            hylle: shelf,
            rad: row,
        }),
    });

    utstyr = await utstyr.json();
    localStorage.setItem("ferdigTilbake", "leggTil");
    localStorage.setItem("ferdigTilbakeText", "Legg til utstyr");
    localStorage.setItem("ferdigText", "Utstyret ble lagt til");
    window.location.replace("/ferdig.html");
});
