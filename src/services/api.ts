import axios from 'axios';

const url = 'https://pokeapi.co/api/v2/pokemon';

export const getPocemons = async (page: number) => {
  const response = await axios.get(`${url}?limit=20&offset=${(page - 1) * 20}`);

  return response.data;
};

export const getPocemonByName = async (name: string) => {
  const response = await axios.get(`${url}/${name}`);

  return response.data;
};
