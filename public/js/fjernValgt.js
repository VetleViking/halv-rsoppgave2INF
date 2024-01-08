window.addEventListener("load", async function() {
    let id = localStorage.getItem("id");
    let utstyr = await fetch("/get/" + id);
    utstyr = await utstyr.json();
    
    createListItem(utstyr);

    document.getElementById("yesBtn").addEventListener("click", async function() {
        await fetch("/delete/" + id);
    });

    document.getElementById("noBtn").addEventListener("click", async function() {
        window.location.replace("/fjernUtstyr.html");
    });
});