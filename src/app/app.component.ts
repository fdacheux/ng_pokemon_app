import { Component, OnInit } from "@angular/core";
import { POKEMONS } from "./mock-pokemon-list";
import Pokemon from "./pokemon";

@Component({
  selector: "app-root",
  templateUrl: 'app.component.html', //vue
})
export class AppComponent implements OnInit{
   //classe: tout ce qui va permettre de faire fonctionner la vue correctement
  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon | undefined;

  ngOnInit(): void {
    console.table(this.pokemonList);
  }

  selectPokemon(pokemonId: string): void {
    const pokemon: Pokemon | undefined = this.pokemonList.find(pokemon => pokemon.id == +pokemonId)
    if (pokemon) {
      console.log(`${pokemon.name}, I chose you ! `);
      this.pokemonSelected = pokemon;
    } else {
      console.log("There is no such pokemon... yet");
      this.pokemonSelected = pokemon;
    }
  }
}
