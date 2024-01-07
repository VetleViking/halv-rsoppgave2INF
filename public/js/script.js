document.getElementById("btn").addEventListener("click", async function() {
    let test = await fetch("/i")
    
    let erKul = await test.json().then(response => response.kul)

    if (erKul) {
        document.getElementById("sykkel").innerHTML = "Kul! :)"
    } else {
        document.getElementById("sykkel").innerHTML = "Neu :("
    }
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