import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  id : number;
  image : String;
  nom : String;
  type : Array<String>;
  chaineEvo : String;
  generation : String;

  constructor() { 
    this.id = 0;
    this.image = "no one";
    this.nom = "no name";
    this.type = [];
    this.chaineEvo = "52";
    this.generation = "52";
  }

  ngOnInit(): void {
  }
  
}
