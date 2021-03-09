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

    var champChoix = document.getElementById("filterText")
    var selected = champChoix.selectedIndex;

    console.log(selected);

    if(selected == 1){
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
    else if(selected == 2){
        var request = new XMLHttpRequest()
        var baseRequest = "https://swapi.co/api/people/?search="
        baseRequest = baseRequest.concat('', p) 

        request.open("GET", baseRequest , true)

        request.onload = function(){
            var data = JSON.parse(this.response)
            console.log(data.results)

            document.getElementById("Nom-Entite").innerHTML = data.results.name;
        }
        request.send()
    }
}