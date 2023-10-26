import axios from 'axios';

export const getPocemons = async (page: number) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`
  );

  return response.data;
};

export const getPocemonByName = async (name: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  return response.data;
};
