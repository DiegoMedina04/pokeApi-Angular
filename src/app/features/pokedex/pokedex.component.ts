import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { PokemonDetailsDto } from '../../core/pokemonDetailsDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit{

  pokemonsz: PokemonDetailsDto[] = [];
  pokemonsCopia: PokemonDetailsDto[] = [];
  cargandoPokemons: boolean = false;
  constructor(private pokemonService: PokemonsService){}
  
  async ngOnInit() {
    await this.getPoekemons();
  }

  searchPokemon(e: any){
    let namePokemon: string = e.target.value;
    return this.pokemonsCopia = this.pokemonsz.filter(pokemon => pokemon.data.name.includes(namePokemon));
  }

  async getPoekemons(){
    if(this.cargandoPokemons) return;
    this.cargandoPokemons = true;
    let pokemons : PokemonDetailsDto[]= await this.pokemonService.getPokemon()
    this.pokemonsz.push(...pokemons);
    this.pokemonsCopia.push(...pokemons);
    this.cargandoPokemons = false;
    console.log({pokemons});
  }

  async getMorePokemons(){
    await this.getPoekemons();
  }
}
