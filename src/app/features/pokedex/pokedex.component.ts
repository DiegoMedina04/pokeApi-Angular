import { Component, OnInit } from '@angular/core';
import { PokemonDetailsDto } from '../../core/Dto/pokemonDetailsDto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PokemonsService } from '../../core/services/pokemons.service';
import { CustomPokemonDto } from '../../core/Dto/customPokemonDto';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  pokemonsz: PokemonDetailsDto[] = [];
  pokemonsCopia: PokemonDetailsDto[] = [];
  cargandoPokemons: boolean = false;
  pokemonsFavorites: CustomPokemonDto[] = [];
  typesPokemon: string[] = [];

  constructor(private pokemonService: PokemonsService, private router: Router) { }

  async ngOnInit() {
    await this.getPoekemons();
    const storedPokemons = localStorage.getItem('pokemons');
    this.pokemonsFavorites = storedPokemons ? JSON.parse(storedPokemons) : [];
    this.validarFavoritos();
  }

  searchPokemon(e: any) {
    let namePokemon: string = e.target.value;
    return this.pokemonsCopia = this.pokemonsz.filter(pokemon => pokemon.data.name.includes(namePokemon));
  }

  async getPoekemons() {
    if (this.cargandoPokemons) return;
    this.cargandoPokemons = true;
    let pokemons: PokemonDetailsDto[] = await this.pokemonService.getPokemon()
    this.pokemonsz.push(...pokemons);
    this.pokemonsCopia.push(...pokemons);
    const typesPokemons = this.pokemonsz.map(pokemon => pokemon.data.types[0].type.name);
    this.typesPokemon = [...new Set(typesPokemons), 'all'];
    this.cargandoPokemons = false;
    console.log({ pokemons });
  }

  async getMorePokemons() {
    await this.getPoekemons();
  }

  logout() {
    localStorage.setItem('isLogged', "false");
    this.router.navigate(['/auth/login']);
  }


  savePreferences(pokemonDetailsDto: PokemonDetailsDto) {
    const storedPokemons = localStorage.getItem('pokemons');
    let pokemons: CustomPokemonDto[] = storedPokemons ? JSON.parse(storedPokemons) : [];

    const pokemonId = pokemonDetailsDto.data.id;
    const pokemonExists = pokemons.some(pokemon => pokemon.id === pokemonId);

    if (pokemonExists) {
      pokemons = pokemons.filter(pokemon => pokemon.id !== pokemonId);
    } else {
      const newPokemon: CustomPokemonDto = {
        id: pokemonId,
        name: pokemonDetailsDto.data.name,
        image: pokemonDetailsDto.data.sprites.other?.dream_world?.front_default ?? ''
      };
      pokemons.push(newPokemon);
    }
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
    this.pokemonsFavorites = pokemons;
  }

  isFavorite(pokemonId: number) {
    const response = this.pokemonsFavorites.some(pokemon => pokemon.id === pokemonId);
    console.log({ pokemonId }, { response })
    return response;
  }

  verificarFavorito(pokemonId: number) {
    return this.pokemonsFavorites.some(pokemon => pokemon.id === pokemonId);
  }

  filterPokemonesByType(type: string) {
    if (type === 'all') {
      return this.pokemonsCopia = this.pokemonsz;
    }
    const pokemonsFilter = this.pokemonsz.filter(pokemon => pokemon.data.types[0].type.name === type);
    return this.pokemonsCopia = pokemonsFilter;
  }

  validarFavoritos() {
    const idsPokemons: number[] = this.pokemonsCopia.map(pokemon => pokemon.data.id);
    this.pokemonsFavorites = this.pokemonsFavorites.filter(pokemon => idsPokemons.includes(pokemon.id));
    localStorage.setItem('pokemons', JSON.stringify(this.pokemonsFavorites));
  }
}
