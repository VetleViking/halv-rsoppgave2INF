function createListItem(element) {
    let html = document.createElement("div");

    let utleid = "Dunno";
    if (element.utleid) {
        utleid = "Ja";
    } else {
        utleid = "Nei";
    }

    html.innerHTML = `
    <div class="listItem"><p>${element.name}</p></div>
    <div class="listItem"><p>${element.id}</p></div>
    <div class="listItem"><p>${utleid}</p></div>`

    html.classList.add("listDiv");

    document.getElementById("allEquipment").appendChild(html);
    return html;
}