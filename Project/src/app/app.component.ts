import { Component, OnInit } from '@angular/core';
import {PokemonComponent} from "./component/pokemon/pokemon.component";
import MD5 from "crypto-js/md5";
import * as $ from "jquery";
import { data } from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  tab : any
  ngOnInit(){
  }

  

  loadComponent(){
 
    var champChoix = document.getElementById("filterText")!;
    var selected = (champChoix as HTMLSelectElement).selectedIndex;

    if((document.getElementById("site-search") as HTMLTextAreaElement).value == ""){
      javascript:alert('Veuillez indiquer un personnage !');
    }

    else if(selected == 1){
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
  * récupère tous les personnages de l'api swapi
  */
  getSW(){
    var request = new XMLHttpRequest()
    var baseRequest = "https://swapi.dev/api/people/"
    request.open("GET", baseRequest , true)

    var tab2 = new Array()

    request.send()

    request.onload = function(){
      var data2 = JSON.parse(this.response)
      for(var i = 0; i < data2.results.length;i++){
        var tmp = data2.results[i].name.toLowerCase()
        tab2.push(tmp)
      }
    }
    this.tab = tab2
    var i = 0
    console.log(this.tab)
    return new Promise(resolve => console.log())
  }
  
  /*
   * Cherche un élément dans le tableau
  */
  myIndexOf(elem){
    for(var i = 0; i < 10; i++){
      if(this.tab[i].toString().localeCompare(elem) == 0){
        return i +1
      }
    }
    return -1
  }

  /*
  Recherche pour les films
  */
  requete(texte, id, url, request){
    var result = texte;

    request = new XMLHttpRequest()

      request.open("GET", url , true)
      request.send()

      request.onload = function(){
        var data2 = JSON.parse(this.response)
        
        if(id === "sw-planete" || "sw-vaisseau" == id || id === "sw-espece")
          result = result.concat(' ', data2.name)
        else if (id === "sw-film")
          result = result.concat(' ', data2.title)

        document.getElementById(id)!.innerHTML = result.toString()
    }
  }

  /*
    Récupération des données pour affichage
  */
  async getDonnees(){

    this.loadComponent()

    var p = (document.getElementById("site-search") as HTMLTextAreaElement).value;

    p = p.toLowerCase();


    var champChoix = document.getElementById("filterText")!;
    var selected = (champChoix as HTMLSelectElement).selectedIndex;
  
    if(selected == 0){
      javascript:alert('Veuillez selectionner un univers !');
    }

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
        await this.getSW()
        var index = this.myIndexOf(p)
        var request = new XMLHttpRequest()
        var baseRequest = "https://swapi.dev/api/people/"
        baseRequest = baseRequest.concat('', index.toString().concat('', '/')) 

        var funfun = this.requete

        request.open("GET", baseRequest , true)

        request.onload = function(){
            var data = JSON.parse(this.response)

            document.getElementById("sw-nom")!.innerHTML = data.name;
            document.getElementById("sw-sexe")!.innerHTML = "Sexe : "  + data.gender.charAt(0).toUpperCase() + data.gender.slice(1);
            document.getElementById("sw-planete")!.innerHTML = "Planète : "  + data.homeworld;
            
            funfun("Première apparition :<br>", "sw-film", data.films[0].replace('http', 'https'), request)
            funfun("Planète :", "sw-planete", data.homeworld, request)
            funfun("Vaisseau :", "sw-vaisseau", data.starships[0], request)
            if(data.species.length == 0)
              document.getElementById("sw-espece")!.innerHTML = "Espèce : Human";
            else
            funfun("Espèce :", "sw-espece", data.species[0], request)
        }
        request.send()
    }
    else if(selected ==3){
        var ts = new Date().getTime();
        var hash = MD5(ts+'9ac7d74cb3352c72413580e0f9e479a2146684cb'+'10b22b8b4415964669f4c2765f3a78c2').toString();
        var url = 'http://gateway.marvel.com/v1/public/characters'
  
        $.getJSON(url, {
          apikey: '10b22b8b4415964669f4c2765f3a78c2',
          ts: ts,
          hash: hash,
          name: p
          })
          .done(function(data) {
            var results = data.data.results;
              document.getElementById("marvel-nom")!.innerHTML = results[0].name;
              document.getElementById("marvel-description")!.innerHTML = results[0].description;
              document.getElementById("marvel-stories")!.innerHTML = "Films : "  + results[0].events.items[results[0].events.returned];
              document.getElementById("marvel-series")!.innerHTML = "Série : "  + results[0].series.items[results[0].series.returned];
              document.getElementById("marvel-image")!.innerHTML = "<img src="  + results[0].thumbnail.path+'/landscape_medium.jpg ' + "style=\"width:200%;height:200%\">";
              
              if( document.getElementById("marvel-description")!.innerHTML == ""){
                document.getElementById("marvel-description")!.innerHTML = "There is no description for this character. Perhaps you could do it yourself so the database of marvel could be more complete. But on our side, we cannot do anything because we are only simple students.";
              }
              
          })
          .fail(function(err){
            // the error codes are listed on the dev site
            console.log(err);
          });
    }
    (document.getElementById("site-search") as HTMLTextAreaElement).value = "";

  }
}
