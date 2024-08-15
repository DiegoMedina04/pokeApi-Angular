import axios from "axios";
import { api } from "../../api/api";
import { PokemonsURLDto } from "../Dto/pokemonsUrlDto";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class HttpPokemon {

    async getPokemonsUrl(limit: number, offset: number): Promise<PokemonsURLDto> {
        try {
            const { data } = await api.get<PokemonsURLDto>(`limit=${limit}&offset=${offset}`);
            return data;
        } catch (error) {
            console.log({ error });
            return { count: 0, next: '', previous: '', results: [] };
        }
    }
}