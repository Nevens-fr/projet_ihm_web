import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lotr',
  templateUrl: './lotr.component.html',
  styleUrls: ['./lotr.component.css']
})
export class LotrComponent implements OnInit {

  nom : String;
  genre : String;
  royaume : String;
  race : String;

  constructor() { 
    this.nom = "egoeingoz";
    this.genre = "fzsgsg";
    this.royaume = "gdfgz";
    this.race = "fzsgsg";
  }

  ngOnInit(): void {
  }

}
