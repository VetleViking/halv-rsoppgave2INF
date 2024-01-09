window.addEventListener("load", async function () {
    let all = await fetch("/all");

    all = await all.json();

    all.forEach((element) => {
        if (element.utleid) {
            return;
        }
        let html = document.createElement("div");

        html.innerHTML = `
        <div class="listItem"><p>${element.name}</p></div>
        <div class="listItem"><p>${element.id}</p></div>`;

        html.classList.add("listDiv");

        document.getElementById("allEquipment").appendChild(html);

        html.addEventListener("click", async function () {
            localStorage.setItem("id", element.id);
            window.location.href = "/utlånValgt.html";
        });
    });
});
