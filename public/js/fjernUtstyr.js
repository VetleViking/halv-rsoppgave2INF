window.addEventListener("load", async function () {
    let loggedIn = await isLoggedIn();

    if (!loggedIn) {
        window.location.replace("/loginAdmin.html");
    }

    let all = await fetch("/all");

    all = await all.json();

    all.forEach((element) => {
        let el = createListItem(element);

        el.addEventListener("click", async function () {
            localStorage.setItem("id", element.id);
            window.location.href = "/fjernValgt.html";
        });
    });
});

