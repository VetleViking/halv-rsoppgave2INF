window.addEventListener("load", async function () {
    let all = await fetch("/all");

    all = await all.json();

    all.forEach((element) => {
        if (!element.utleid) {
            return;
        }
        let html = document.createElement("div");

        let date = new Date(element.utlånsdato);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        html.innerHTML = `
        <div class="listItem"><p>${element.name}</p></div>
        <div class="listItem"><p>${element.id}</p></div>
        <div class="listItem"><p>${day + "." + month + "." + year}</p></div>
        <div class="listItem"><p>${element.ansvarlig}</p></div>
        <div class="listItem"><p>${element.låntaker}</p></div>`;

        html.classList.add("listDiv");

        document.getElementById("allEquipment").appendChild(html);

        html.addEventListener("click", async function () {
            localStorage.setItem("id", element.id);
            window.location.href = "/innleveringValgt.html";
        });
    });
});
