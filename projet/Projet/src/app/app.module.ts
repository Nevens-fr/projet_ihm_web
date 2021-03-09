import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { LotrComponent } from './lotr/lotr.component';
import { StarwarsComponent } from './starwars/starwars.component';
import { MarvelComponent } from './marvel/marvel.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    LotrComponent,
    StarwarsComponent,
    MarvelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
