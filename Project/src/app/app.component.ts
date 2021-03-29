import { Component, OnInit } from '@angular/core';
import {PokemonComponent} from "./component/pokemon/pokemon.component";

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
    }
    else if(selected == 2){
      document.getElementById("composant")!.style.display = "none";
      document.getElementById("composant2")!.style.display = "block";
    }
  }

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
            document.getElementById("pokemon-nom")!.innerHTML = "Nom : "  + data.name.charAt(0).toUpperCase() + data.name.slice(1);
            document.getElementById("pokemon-id")!.innerHTML = "ID : "  + data.id;
            try{
              document.getElementById("pokemon-type")!.innerHTML = "Type : "  + data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1) + ", " + data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1);
            }
            catch(error){
              document.getElementById("pokemon-type")!.innerHTML = "Type : "  + data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
            }
            document.getElementById("pokemon-generation")!.innerHTML = "Poids : "  + data.weight;
            document.getElementById("pokemon-evol")!.innerHTML = "Taille : "  + data.height;
            document.getElementById("pokemon-image")!.innerHTML = "Image : <img src="  + data.sprites.front_default+">";
        }
        request.send()
    }
    else if(selected == 2){
        var request = new XMLHttpRequest()
        var baseRequest = "https://swapi.dev/api/people/"
        baseRequest = baseRequest.concat('', p) 

        request.open("GET", baseRequest , true)

        request.onload = function(){
            var data = JSON.parse(this.response)

            document.getElementById("sw-nom")!.innerHTML = "Nom : "  + data.name;
            document.getElementById("sw-sexe")!.innerHTML = "Sexe : "  + data.gender;
            document.getElementById("sw-planete")!.innerHTML = "Planète : "  + data.homeworld;
            document.getElementById("sw-film")!.innerHTML = "Films : ";
            for (const film in data.films){
              console.log(data.films[film])
              var request = new XMLHttpRequest()

              request.open("GET", data.films[film] , true)

              request.onload = function(){
                var data = JSON.parse(this.response)
                document.getElementById("sw-film")!.innerHTML = document.getElementById("sw-film")!.innerHTML  + data.name;
              }
            }
            
            document.getElementById("sw-espece")!.innerHTML = "Espèce : "  + data.species[0];
            document.getElementById("sw-vaisseau")!.innerHTML = "films : "  + data.starships[0];
        }
        request.send()
    }
  }
}
