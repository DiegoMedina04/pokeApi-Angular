import axios from "axios";


export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?';


export const api = axios.create({
    baseURL: BASE_URL
})