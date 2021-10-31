import axios from 'axios';

const baseUrl = 'http://pokeapi.co/api/v2';
const query = {
  pokemon: 'pokemon',
};

export async function fetchPokemon(pokemon) {
  return fetch(`${baseUrl}/${query.pokemon}/${pokemon}`);
}

export default axios.create({
  baseURL: 'http://localhost:3006/',
});
