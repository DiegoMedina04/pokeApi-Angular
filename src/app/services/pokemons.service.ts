import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonsURL } from '../core/pokemonsUrl';
import axios from 'axios';
import { catchError, Observable } from 'rxjs';
import { PokemonDetailsDto } from '../core/pokemonDetailsDto';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private offset: number= -20;
  private limit:  number= 20;
   private BASE_URL: string= `https://pokeapi.co/api/v2/pokemon?`;

  constructor(private http: HttpClient) { }

  async  getPokemonsUrl(): Promise<PokemonsURL> {
     try {
      
      this.offset += 20;
      let apiUrl: string= `${this.BASE_URL}offset=${this.offset}&limit=${this.limit}`;
      console.log({apiUrl});
      const {data} = await axios.get<PokemonsURL>(apiUrl);
      return data;
     } catch (error) {
        console.log({error});
        return {count: 0, next: '', previous: '', results: []};
     }
  }

  async getPokemon(): Promise<PokemonDetailsDto[]> {
    try {
      const pokemons: PokemonsURL= await this.getPokemonsUrl();
      const urlsPokemons: Promise<any>[]= [];
      pokemons.results.forEach(pokemon => urlsPokemons.push(axios.get(pokemon.url)));
      return await Promise.all(urlsPokemons);
    } catch (error) {
      console.log({error});
      return [];
    }
  }
}
// terceros, vehiculos, activo fijos, insumos