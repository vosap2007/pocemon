import { configureStore } from '@reduxjs/toolkit';
import { pokemonsReducer, pokemonReducer } from './pokemonSlice';

export const store = configureStore({
  reducer: {
    pocemons: pokemonsReducer,
    pocemon: pokemonReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
