import { Component } from '@angular/core';
import Pokemon from '../pokemon';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styles: [
  ]
})
export class AddPokemonComponent {
  pokemon : Pokemon | undefined;

  ngOnInit(): void {
    this.pokemon = new Pokemon()
  }
}
