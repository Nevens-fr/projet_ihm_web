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

  getDonnees(){
    var poke = new PokemonComponent();
    var p = (document.getElementById("site-search") as HTMLTextAreaElement).value;
    console.log(p);

    p = p.toLowerCase();

    var champChoix = document.getElementById("filterText")!
    var selected = (champChoix as HTMLSelectElement).selectedIndex;

    console.log(selected);

    if(selected == 1){
        var request = new XMLHttpRequest()
        var baseRequest = "https://pokeapi.co/api/v2/pokemon/"
        baseRequest = baseRequest.concat('', p) 

        request.open("GET", baseRequest , true)

        request.onload = function(){
            var data = JSON.parse(this.response)
            console.log(data.name)
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
        var baseRequest = "https://swapi.co/api/people/?search="
        baseRequest = baseRequest.concat('', p) 

        request.open("GET", baseRequest , true)

        request.onload = function(){
            var data = JSON.parse(this.response)
            console.log(data.results)

            document.getElementById("Nom-Entite")!.innerHTML = data.results.name;
        }
        request.send()
    }
  }
}
