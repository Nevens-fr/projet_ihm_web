import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarWarsComponent } from './component/star-wars/star-wars.component';
import { PokemonComponent } from './component/pokemon/pokemon.component';
import { MarvelComponent } from './component/marvel/marvel.component';

@NgModule({
  declarations: [
    AppComponent,
    StarWarsComponent,
    PokemonComponent,
    MarvelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
