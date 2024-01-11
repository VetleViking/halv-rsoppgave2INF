window.addEventListener("load", async function () {
    let text = this.localStorage.getItem("ferdigText");

    if (text != null) {
        document.getElementById("ferdigText").innerHTML = text;
    }

    let back = this.localStorage.getItem("ferdigTilbake");

    if (back != null) {
        tilbakeKnapp = document.getElementById("ferdigTilbake");

        tilbakeKnapp.addEventListener("click", function () {
            window.location.replace("/" + back +".html");
        });

        back = back.charAt(0).toUpperCase() + back.slice(1);
        tilbakeKnapp.innerHTML += back;
    }

    document.getElementById("ferdigHjem").addEventListener("click", function () {
        window.location.replace("/index.html");
    });
});