window.addEventListener("load", async function () {
    let id = localStorage.getItem("id");

    let utstyr = await fetch("/get/" + id);
    utstyr = await utstyr.json();

    createListItem(utstyr);

    document.getElementById("yesBtn").addEventListener("click", async function () {
        localStorage.removeItem("id");
        await fetch("/delete/" + id);
        localStorage.setItem("ferdigTilbake", "fjernUtstyr");
        localStorage.setItem("ferdigTilbakeText", "Fjern utstyr");
        localStorage.setItem("ferdigText", "Utstyret er fjernet.");
        window.location.replace("/ferdig.html");
    });

    document.getElementById("noBtn").addEventListener("click", async function () {
        localStorage.removeItem("id");
        window.location.replace("/fjernUtstyr.html");
    });
});
