import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-wars',
  templateUrl: './star-wars.component.html',
  styleUrls: ['./star-wars.component.css']
})
export class StarWarsComponent implements OnInit {

  id: number;
  nom: String;
  sexe: boolean;
  planete: String;
  films: Array<String>;
  espece: String;
  vaisseaux: Array<String>;

  constructor() {
    this.id= 0;
    this.nom = "Joe Doe";
    this.sexe = false;
    this.planete = "Terre";
    this.films = [];
    this.espece = "Unknown";
    this.vaisseaux = [];
  }

  ngOnInit(): void {
  }
}
