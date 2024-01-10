window.addEventListener("load", async function () {
    let id = localStorage.getItem("id");

    let utstyr = await fetch("/get/" + id);
    utstyr = await utstyr.json();

    let date = new Date();
    
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    date = date.toISOString();

    let html = document.createElement("div");

    html.innerHTML = `
    <div class="listItem"><p>${utstyr.name}</p></div>
    <div class="listItem"><p>${utstyr.id}</p></div>
    <div class="listItem"><p>${day + "." + month + "." + year}</p></div>`;

    html.classList.add("listDiv");

    document.getElementById("allEquipment").appendChild(html);

    document.getElementById("yesBtn").addEventListener("click", async function () {
        let ansvarlig = document.getElementById("ansvarlig").value;
        let låntaker = document.getElementById("låntaker").value;

        if (ansvarlig == "" || låntaker == "") {
            return;
        }

        localStorage.removeItem("id");
        await fetch("/modify/" + id + "/utleid/true");
        await fetch("/modify/" + id + "/utlånsdato/" + date);
        await fetch("/modify/" + id + "/ansvarlig/" + ansvarlig);
        await fetch("/modify/" + id + "/låntaker/" + låntaker);
        window.location.replace("/ferdig.html");
    });

    document.getElementById("noBtn").addEventListener("click", async function () {
        localStorage.removeItem("id");
        window.location.replace("/utlån.html");
    });
});
