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

function filterSearch() {
    let input = document.getElementById("searchInput").value;
    input = input.toLowerCase();

    let all = document.getElementsByClassName("listDiv");

    for (let i = 0; i < all.length; i++) {
        let text = all[i].innerText;
        text = text.toLowerCase();

        if (text.includes(input)) {
            all[i].style.display = "grid";
        } else {
            all[i].style.display = "none";
        }
    }
}

async function isLoggedIn() {
    let response = await fetch("/session");

    let data = await response.json();

    console.log(data);

    const user = data.user;

    const loggedIn = data.hasOwnProperty("user");

    console.log(loggedIn);

    return loggedIn;
}

function onEnter(input, func = function() {console.log("No function given");}) {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            func();
        }
    });
}