document.getElementById("btn").addEventListener("click", async function() {
    let navn = document.getElementById("navn").value;
    let hylle = document.getElementById("hylle").value;
    let rad = document.getElementById("rad").value;

    let utstyr = await fetch("/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: navn,
            hylle: hylle,
            rad: rad
        })
    });

    utstyr = await utstyr.json();
    console.log(utstyr.name, utstyr.hylle, utstyr.rad);

});