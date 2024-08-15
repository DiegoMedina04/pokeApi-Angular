import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { PokemonDetailsDto } from '../Dto/pokemonDetailsDto';
import { PokemonsURLDto } from '../Dto/pokemonsUrlDto';
import { HttpPokemon } from '../http/http-pokemon';
import { CustomPokemonDto } from '../Dto/customPokemonDto';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private offset: number = -20;
  private limit: number = 20;
  private listPokemons: PokemonDetailsDto[] = [];

  constructor(private http: HttpClient, private httpPokemon: HttpPokemon) { }

  async getPokemonsUrl(): Promise<PokemonsURLDto> {
    this.offset += 20;
    return this.httpPokemon.getPokemonsUrl(this.limit, this.offset);
  }

  async getPokemon(): Promise<PokemonDetailsDto[]> {
    try {
      const pokemons: PokemonsURLDto = await this.getPokemonsUrl();
      const urlsPokemons: Promise<any>[] = [];
      pokemons.results.forEach(pokemon => urlsPokemons.push(axios.get(pokemon.url)));
      this.listPokemons = await Promise.all(urlsPokemons);
      return this.listPokemons;
    } catch (error) {
      console.log({ error });
      return [];
    }
  }

  searchPokemonByName(name: string): PokemonDetailsDto[] {
    console.log({ name });
    const response = this.listPokemons.filter(pokemon => pokemon.data.name.includes(name));
    console.log({ response });
    return response;
  }

  updatePreferences(pokemonDetailsDto: PokemonDetailsDto) {

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
    return pokemons;
  }

  filterByTypePokemons(type: string): PokemonDetailsDto[] {
    if (type === 'all') return this.listPokemons;
    return this.listPokemons.filter(pokemon => pokemon.data.types[0].type.name === type);
  }

}


//   async getPokemonsUrl(): Promise < PokemonsURLDto > {
//   try {

//     this.offset += 20;
//     let apiUrl: string = `${this.BASE_URL}offset=${this.offset}&limit=${this.limit}`;
//     console.log({ apiUrl });
//     const { data } = await axios.get<PokemonsURLDto>(apiUrl);
//     return data;
//   } catch(error) {
//     console.log({ error });
//     return { count: 0, next: '', previous: '', results: [] };
//   }
// }


//   async getPokemon(): Promise < PokemonDetailsDto[] > {
//   try {
//     const pokemons: PokemonsURLDto = await this.getPokemonsUrl();
//     const urlsPokemons: Promise<any>[] = [];
//     pokemons.results.forEach(pokemon => urlsPokemons.push(axios.get(pokemon.url)));
//     return await Promise.all(urlsPokemons);
//   } catch(error) {
//     console.log({ error });
//     return [];
//   }
// }