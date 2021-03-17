import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marvel',
  templateUrl: './marvel.component.html',
  styleUrls: ['./marvel.component.css']
})
export class MarvelComponent implements OnInit {

  id : number;
  image : String;
  description : String;
  series : String;
  film : String;

  constructor() {
    this.id = 0;
    this.image = "no one";
    this.description = "no name";
    this.series = "truc";
    this.film = "52";
   }

  ngOnInit(): void {
  }

}
