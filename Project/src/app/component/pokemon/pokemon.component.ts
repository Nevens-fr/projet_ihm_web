import { 
  Component, 
  OnInit, 
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {

  id : any;
  image : any;
  nom : any;
  type : any;
  height : any;
  weight : any; 
}