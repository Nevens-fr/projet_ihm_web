import { Component, OnInit } from '@angular/core';
import {PokemonComponent} from "./component/pokemon/pokemon.component";
import MD5 from "crypto-js/md5";
import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(){
  }

  loadComponent(){
    var champChoix = document.getElementById("filterText")!;
    var selected = (champChoix as HTMLSelectElement).selectedIndex;

    if(selected == 1){
      document.getElementById("composant")!.style.display = "block";
      document.getElementById("composant2")!.style.display = "none";
      document.getElementById("composant3")!.style.display = "none";
    }
    else if(selected == 2){
      document.getElementById("composant")!.style.display = "none";
      document.getElementById("composant2")!.style.display = "block";
      document.getElementById("composant3")!.style.display = "none";
    }
    else if(selected == 3){
      document.getElementById("composant")!.style.display = "none";
      document.getElementById("composant2")!.style.display = "none";
      document.getElementById("composant3")!.style.display = "block";
    }
  }

  /*
  Recherche pour les films
  */
  async requete(data, texte, id, url){
    var result = texte;
    await setTimeout(() => {   }, 4000);
    var request1 = new XMLHttpRequest()

      request1.open("GET", url , true)
      console.log(request1)

      request1.onload = function(){
        console.log("0.5")
        var data2 = JSON.parse(this.response)

        result = result.concat(' ', data2.homeworld)
    }
    document.getElementById(id)!.innerHTML = result.toString()
  }

  /*
    Récupération des données pour affichage
  */
  getDonnees(){

    this.loadComponent()
    var poke = new PokemonComponent();
    var p = (document.getElementById("site-search") as HTMLTextAreaElement).value;

    p = p.toLowerCase();

    var champChoix = document.getElementById("filterText")!
    var selected = (champChoix as HTMLSelectElement).selectedIndex;

    if(selected == 1){
        var request = new XMLHttpRequest()
        var baseRequest = "https://pokeapi.co/api/v2/pokemon/"
        baseRequest = baseRequest.concat('', p) 

        request.open("GET", baseRequest , true)

        request.onload = function(){
            var data = JSON.parse(this.response)
            document.getElementById("pokemon-nom")!.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            document.getElementById("pokemon-id")!.innerHTML = "ID : "  + data.id;
            try{
              document.getElementById("pokemon-type")!.innerHTML = "Type : "  + data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1) + ", " + data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1);
            }
            catch(error){
              document.getElementById("pokemon-type")!.innerHTML = "Type : "  + data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
            }
            document.getElementById("pokemon-generation")!.innerHTML = "Poids : "  + data.weight;
            document.getElementById("pokemon-evol")!.innerHTML = "Taille : "  + data.height;
            document.getElementById("pokemon-image")!.innerHTML = "<img src="  + data.sprites.front_default+" style=\"width:200%;height:200%\">";
        }
        request.send()
    }
    else if(selected == 2){
        var request = new XMLHttpRequest()
        var baseRequest = "https://swapi.dev/api/people/"
        baseRequest = baseRequest.concat('', p) 

        var funfun = this.requete

        request.open("GET", baseRequest , true)
        console.log(request)

        request.onload = function(){
            var data = JSON.parse(this.response)

            document.getElementById("sw-nom")!.innerHTML = "Nom : "  + data.name;
            document.getElementById("sw-sexe")!.innerHTML = "Sexe : "  + data.gender;
            document.getElementById("sw-planete")!.innerHTML = "Planète : "  + data.homeworld;
            
            funfun(data, "Film :", "sw-film", data.films)
            funfun(data, "Planète :", "sw-planete", data.homeworld)
            
            document.getElementById("sw-espece")!.innerHTML = "Espèce : "  + data.species[0];
            document.getElementById("sw-vaisseau")!.innerHTML = "Vaisseau : "  + data.starships[0];
        }
        request.send()
    }
    else if(selected ==3){
      $(function(){
        var marvelAPI = 'https://gateway.marvel.com/v1/public/characters';
        $.getJSON( marvelAPI, {
            apikey:'e902f113dfa39dc0c4bd33abd53c3ec9'
          })
            .done(function( p ) {
              var results = p.data.results;
              document.getElementById("marvel-nom")!.innerHTML = "Nom : "  + results.name;
              document.getElementById("marvel-description")!.innerHTML = "Description : "  + results.description;
              document.getElementById("marvel-stories")!.innerHTML = "Films : "  + results.stories;
              document.getElementById("marvel-series")!.innerHTML = "Série : "  + results.series;
          });
           
        });
    }
  }
}
