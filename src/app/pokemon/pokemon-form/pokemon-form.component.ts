import { Component, Input, OnInit } from "@angular/core";
import { PokemonService } from "../pokemon.service";
import Pokemon from "../pokemon";
import { Router } from "@angular/router";

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.scss"],
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon | undefined;
  types: string[] | undefined;
  isAddForm: boolean | undefined;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.types = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes("add");
  }

  hasType(type: string): boolean | void {
    if (this.pokemon) {
      return this.pokemon?.types.includes(type);
    }
  }

  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.pokemon?.types.push(type);
      
    } else {
      const index = this.pokemon?.types.indexOf(type) ?? 0;
      this.pokemon?.types.splice(index, 1);
    }
  }

  isTypesValid(type: string): boolean {
    if (this.pokemon?.types.length == 1 && this.hasType(type)) {
      return false;
    }

    if (this.pokemon && this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  cancelEdition() {
    if (this.router.url == "/pokemons/edit") {
      this.router.navigate([`/pokemons/${this.pokemon?.id}`])
    }
    else if (this.router.url == "/pokemons/add") {
      this.router.navigate(['/pokemons'])
    }
  }
 
  onSubmit() {
    console.log(this.pokemon)
    if (this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon).subscribe((pokemon: Pokemon) => this.router.navigate(["/pokemons", pokemon.id]))
    } else {
      this.pokemonService.updatePokemon(this.pokemon).subscribe(
        () => this.router.navigate(["/pokemons", this.pokemon?.id]),
        (error) => /*snackbar err to do*/ console.error(error)
      );
    }
  }
}
