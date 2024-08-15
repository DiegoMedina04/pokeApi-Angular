import { Component, OnInit } from '@angular/core';
import { PokemonDetailsDto } from '../../core/Dto/pokemonDetailsDto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PokemonsService } from '../../core/services/pokemons.service';
import { CustomPokemonDto } from '../../core/Dto/customPokemonDto';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  pokemons: PokemonDetailsDto[] = [];
  pokemonsFiltered: PokemonDetailsDto[] = [];
  loading: boolean = false;
  pokemonsFavorites: CustomPokemonDto[] = [];
  typesPokemon: string[] = [];

  constructor(private pokemonService: PokemonsService, private router: Router, private authService: AuthService) { }

  async ngOnInit() {
    await this.loadPokemons();
    const storedPokemons = localStorage.getItem('pokemons');
    this.pokemonsFavorites = storedPokemons ? JSON.parse(storedPokemons) : [];
    this.validarFavoritos();
  }

  searchPokemon(e: any) {
    let namePokemon: string = e.target.value;
    return this.pokemonsFiltered = this.pokemons.filter(pokemon => pokemon.data.name.includes(namePokemon));
  }

  async loadPokemons() {
    if (this.loading) return;
    this.loading = true;
    let pokemons: PokemonDetailsDto[] = await this.pokemonService.getPokemon()
    this.pokemons.push(...pokemons);
    this.pokemonsFiltered.push(...pokemons);
    const typesPokemons = this.pokemons.map(pokemon => pokemon.data.types[0].type.name);
    this.typesPokemon = [...new Set(typesPokemons), 'all'];
    this.loading = false;
  }

  async getMorePokemons() {
    await this.loadPokemons();
  }

  logout() {
    this.authService.logout();
  }


  savePreferences(pokemonDetailsDto: PokemonDetailsDto) {
    this.pokemonsFavorites = this.pokemonService.updatePreferences(pokemonDetailsDto);
    // const storedPokemons = localStorage.getItem('pokemons');
    // let pokemons: CustomPokemonDto[] = storedPokemons ? JSON.parse(storedPokemons) : [];

    // const pokemonId = pokemonDetailsDto.data.id;
    // const pokemonExists = pokemons.some(pokemon => pokemon.id === pokemonId);

    // if (pokemonExists) {
    //   pokemons = pokemons.filter(pokemon => pokemon.id !== pokemonId);
    // } else {
    //   const newPokemon: CustomPokemonDto = {
    //     id: pokemonId,
    //     name: pokemonDetailsDto.data.name,
    //     image: pokemonDetailsDto.data.sprites.other?.dream_world?.front_default ?? ''
    //   };
    //   pokemons.push(newPokemon);
    // }
    // localStorage.setItem('pokemons', JSON.stringify(pokemons));
    // this.pokemonsFavorites = pokemons;
  }

  isFavorite(pokemonId: number) {
    const response = this.pokemonsFavorites.some(pokemon => pokemon.id === pokemonId);
    return response;
  }

  verificarFavorito(pokemonId: number) {
    return this.pokemonsFavorites.some(pokemon => pokemon.id === pokemonId);
  }

  filterPokemonesByType(type: string) {
    // if (type === 'all') {
    //   return this.pokemonsFiltered = this.pokemons;
    // }
    // const pokemonsFilter = this.pokemons.filter(pokemon => pokemon.data.types[0].type.name === type);
    // return this.pokemonsFiltered = pokemonsFilter;
    return this.pokemonsFiltered = this.pokemonService.filterByTypePokemons(type);
  }

  validarFavoritos() {
    const idsPokemons: number[] = this.pokemonsFiltered.map(pokemon => pokemon.data.id);
    this.pokemonsFavorites = this.pokemonsFavorites.filter(pokemon => idsPokemons.includes(pokemon.id));
    localStorage.setItem('pokemons', JSON.stringify(this.pokemonsFavorites));
  }
}
