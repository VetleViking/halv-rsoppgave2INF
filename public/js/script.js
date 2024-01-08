document.getElementById("btn").addEventListener("click", async function() {
    let navn = document.getElementById("navn").value;
    let hylle = document.getElementById("hylle").value;
    let rad = document.getElementById("rad").value;

    let utstyr = await fetch("/i", {
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
    console.log(utstyr.name);

});
document.getElementById("btn2").addEventListener("click", async function() {
    let slettet = await fetch("/test");
    slettet = await slettet.json();

    let slettetTing = document.createElement("p");
    slettetTing.innerHTML ="Dette var slettet:";
    document.getElementById("sykkel2").appendChild(slettetTing);

    slettet.forEach(element => {
        console.log(element.name);
        let slettetTing = document.createElement("p");
        slettetTing.innerHTML = element.name + ", den var " + (element.kul ? "kul" : "ikke kul");
        document.getElementById("sykkel2").appendChild(slettetTing);

        
    });
    console.log(slettet);
});