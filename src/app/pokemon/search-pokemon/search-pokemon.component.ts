import { Component } from '@angular/core';
import Pokemon from '../pokemon';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent {
 
  //users data on a timelapse : {...'a'...'ab' ... 'aba' ... 'ab' ... 'abr'... 'abra'}
  searchTerms = new Subject<string>();
  //then we'll want to do the research corresponding to the steps of the user : first a research on 'a',  then on 'ab' and so on
  pokemons$: Observable<Pokemon[]> | undefined;

  constructor(private router: Router, private pokemonService: PokemonService){}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      //debounce will eliminate the requests if made in less than 300 ms
      distinctUntilChanged(),
      //eliminate requests if they are the same ("ab" and "ab0 for instance")
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    )
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
