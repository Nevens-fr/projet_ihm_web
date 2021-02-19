function recherche(){
    var p = document.getElementById("button");
    p.onclick = getDonnees();
}

/*
Fonction permettant d'envoyer des données
*/
function getDonnees(){
    var p = document.getElementById("site-search").value;
    console.log(p);

    var request = new XMLHttpRequest()
    var baseRequest = "https://pokeapi.co/api/v2/pokemon-species/"
    baseRequest = baseRequest.concat('', p) 

    request.open("GET", baseRequest , true)

    request.onload = function(){
        var data = JSON.parse(this.response)
        console.log(data.name)

        document.getElementById("Nom-Entite").innerHTML = data.names[4].name;
    }
    request.send()
}