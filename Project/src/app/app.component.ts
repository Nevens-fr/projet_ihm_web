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

  

  /*
   * Methode permettant de faire apparaitre le bon bloc d'information en fonction de l'univers recherché
   */
  loadComponent(){
 
    var champChoix = document.getElementById("filterText")!;
    var selected = (champChoix as HTMLSelectElement).selectedIndex;

    //Affichage d'une erreur si le champs de recherche de personnage est vide
    if((document.getElementById("site-search") as HTMLTextAreaElement).value == ""){
      javascript:alert('Please enter a character\'s name !');
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
   *Recherche pour les films Star Wars
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
   *Récupération des données et affichage
   */
  async getDonnees(){

    this.loadComponent()

    var p = (document.getElementById("site-search") as HTMLTextAreaElement).value;

    //Mise en minuscule de la recherche car certaines API n'aiment pas la casse
    p = p.toLowerCase();


    var champChoix = document.getElementById("filterText")!;
    var selected = (champChoix as HTMLSelectElement).selectedIndex;
  
    //Si pas d'univers séléctionné, on affiche une erreur
    if(selected == 0){
      javascript:alert('Please choose a universe !');
    }

    //Si univers Pokemon séléctionné
    if(selected == 1){

        var request = new XMLHttpRequest()
        var baseRequest = "https://pokeapi.co/api/v2/pokemon/"
        baseRequest = baseRequest.concat('', p) 

        request.open("GET", baseRequest , true)

        request.onload = function(){

            //On regarde si le personnage est bien connu dans la base de données
            try{
              var data = JSON.parse(this.response)

              document.getElementById("pokemon-nom")!.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
              document.getElementById("pokemon-id")!.innerHTML = "ID : "  + data.id;

              //Si le pokemon à deux types différents on les affiche
              try{
                document.getElementById("pokemon-type")!.innerHTML = "Type : "  + data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1) + ", " + data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1);
              }

              //Si le pokemon n'a qu'un seul type, on l'affiche
              catch(error){
                document.getElementById("pokemon-type")!.innerHTML = "Type : "  + data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
              }

              document.getElementById("pokemon-generation")!.innerHTML = "Weight : "  + data.weight;
              document.getElementById("pokemon-evol")!.innerHTML = "Height : "  + data.height;
              document.getElementById("pokemon-image")!.innerHTML = "<img src="  + data.sprites.front_default+" style=\"width:200%;height:200%\">";

              //On remet les éléments visibles (si jamais ils ont été cachés par une mauvaise recherche)
              document.getElementById("pokemon-id")!.style.display = "block";
              document.getElementById("pokemon-type")!.style.display = "block";
              document.getElementById("pokemon-generation")!.style.display = "block";
              document.getElementById("pokemon-evol")!.style.display = "block";
              document.getElementById("pokemon-image")!.style.display = "block";
            }

            //Si personnage pas connu, on affiche une erreur
            catch(error){
              document.getElementById("pokemon-nom")!.innerHTML = "Unknown character"
              document.getElementById("pokemon-id")!.style.display = "none";
              document.getElementById("pokemon-type")!.style.display = "none";
              document.getElementById("pokemon-generation")!.style.display = "none";
              document.getElementById("pokemon-evol")!.style.display = "none";
              document.getElementById("pokemon-image")!.style.display = "none";
            }
        }
        request.send()
    }

    //Si univers Star Wars séléctionné
    else if(selected == 2){
        var request = new XMLHttpRequest()
        var baseRequest = "https://swapi.dev/api/people/?search="
        baseRequest = baseRequest.concat('',p) 

        var funfun = this.requete

        request.open("GET", baseRequest , true)

        request.onload = function(){

          //On regarde si le personnage est bien connu dans la base de données
          try{
            var data = JSON.parse(this.response)

            document.getElementById("sw-nom")!.innerHTML = data.results[0].name;
            document.getElementById("sw-sexe")!.innerHTML = "Gender : "  + data.results[0].gender.charAt(0).toUpperCase() + data.results[0].gender.slice(1);
            document.getElementById("sw-planete")!.innerHTML = "Homeworld : "  + data.results[0].homeworld;
              
            funfun("First appearance :<br>", "sw-film", data.results[0].films[0].replace('http', 'https'), request)
            funfun("Homeworld :", "sw-planete", data.results[0].homeworld, request)
            funfun("Starship :", "sw-vaisseau", data.results[0].starships[0], request)

            //On verifie si le personnage est un humain pour l'afficher, car l'api ne le fait pas seul
            if(data.results[0].species.length == 0)
              document.getElementById("sw-espece")!.innerHTML = "Species : Human";
            else
              funfun("Species :", "sw-espece", data.results[0].species[0], request)

            //On remet les éléments visibles (si jamais ils ont été cachés par une mauvaise recherche)
            document.getElementById("sw-sexe")!.style.display = "block";
            document.getElementById("sw-planete")!.style.display = "block";
            document.getElementById("sw-vaisseau")!.style.display = "block";
            document.getElementById("sw-film")!.style.display = "block";
            document.getElementById("sw-espece")!.style.display = "block";
          }

          //Si personnage pas connu, on affiche une erreur
          catch(error){
            document.getElementById("sw-nom")!.innerHTML = "Unknown character"
            document.getElementById("sw-sexe")!.style.display = "none";
            document.getElementById("sw-planete")!.style.display = "none";
            document.getElementById("sw-vaisseau")!.style.display = "none";
            document.getElementById("sw-film")!.style.display = "none";
            document.getElementById("sw-espece")!.style.display = "none";
          }
        }
        request.send()
    }

    //Si univers Marvel séléctionné
    else if(selected ==3){
        var ts = new Date().getTime();
        var hash = MD5(ts+'9ac7d74cb3352c72413580e0f9e479a2146684cb'+'10b22b8b4415964669f4c2765f3a78c2').toString();
        var url = 'http://gateway.marvel.com/v1/public/characters'
  
        //Envoi de la clé d'API
        $.getJSON(url, {
          apikey: '10b22b8b4415964669f4c2765f3a78c2',
          ts: ts,
          hash: hash,
          name: p
          })
          .done(function(data) {

            //On regarde si le personnage est bien connu dans la base de données
            try{
              var results = data.data.results;
              document.getElementById("marvel-nom")!.innerHTML = results[0].name;
              document.getElementById("marvel-description")!.innerHTML = results[0].description;
              document.getElementById("marvel-series")!.innerHTML = "Comics: "  + results[0].series.items[0].name;
              document.getElementById("marvel-stories")!.innerHTML = "Story Comics: "  + results[0].stories.items[0].name;
              document.getElementById("marvel-image")!.innerHTML = "<img src="  + results[0].thumbnail.path+'/landscape_medium.jpg ' + "style=\"width:200%;height:200%\">";

                
              //Certain personnages n'ont pas de description. Ajout d'une description générique afin de ne pas faire de conflit ou d'erreurs sur la page.
              if( document.getElementById("marvel-description")!.innerHTML == ""){
                document.getElementById("marvel-description")!.innerHTML = "There is no description for this character. Perhaps you could do it yourself so the database of marvel could be more complete. But on our side, we cannot do anything because we are only simple students.";
              }

              //On remet les éléments visibles (si jamais ils ont été cachés par une mauvaise recherche)
              document.getElementById("marvel-description")!.style.display = "block";
              document.getElementById("marvel-stories")!.style.display = "block";
              document.getElementById("marvel-series")!.style.display = "block";
              document.getElementById("marvel-image")!.style.display = "block";
            }

            //Si personnage pas connu, on affiche une erreur
            catch(error){
              document.getElementById("marvel-nom")!.innerHTML = "Unknown character"
              document.getElementById("marvel-description")!.style.display = "none";
              document.getElementById("marvel-stories")!.style.display = "none";
              document.getElementById("marvel-series")!.style.display = "none";
              document.getElementById("marvel-image")!.style.display = "none";
            }
              
          })
          .fail(function(err){
            // the error codes are listed on the dev site
            console.log(err);
          });
    }

    //On vide la barre de recherche afin que l'utilisateur n'ai pas à le faire lui même
    (document.getElementById("site-search") as HTMLTextAreaElement).value = "";

  }
}
