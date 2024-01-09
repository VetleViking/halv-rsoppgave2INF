document.getElementById("btn").addEventListener("click", async function () {
    let name = document.getElementById("name").value;
    let shelf = document.getElementById("shelf").value;
    let row = document.getElementById("row").value;

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
    console.log(utstyr.name, utstyr.hylle, utstyr.rad);
});
