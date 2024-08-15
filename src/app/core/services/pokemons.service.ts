import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { PokemonDetailsDto } from '../Dto/pokemonDetailsDto';
import { PokemonsURLDto } from '../Dto/pokemonsUrlDto';
import { HttpPokemon } from '../http/http-pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private offset: number = -20;
  private limit: number = 20;
  private BASE_URL: string = `https://pokeapi.co/api/v2/pokemon?`;

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
      return await Promise.all(urlsPokemons);
    } catch (error) {
      console.log({ error });
      return [];
    }
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