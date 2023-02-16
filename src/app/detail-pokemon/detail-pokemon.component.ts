import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { POKEMONS } from '../mock-pokemon-list';
import Pokemon from '../pokemon';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styles: [
  ]
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[] | undefined;
  pokemon: Pokemon | undefined;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.pokemonList = POKEMONS
    const pokemonId: string | null = this.router.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.pokemon = this.pokemonList.find(pokemon => pokemon.id == +pokemonId)
    } 
  }
}
