import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPocemonByName, getPocemons } from '../services/api';

interface Pocemon {
  id: number;
  name: string;
}

interface PocemonsState {
  pocemons: Pocemon[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
  page: number;
}

const initialState: PocemonsState = {
  pocemons: [],
  status: 'idle',
  error: '',
  page: 1,
};

export const fetchPocemons = createAsyncThunk(
  'pocemons/fetchAllPocemons',
  async (page: number) => {
    const results = await getPocemons(page);
    return { data: results, page };
  }
);

export const fetchPokemonByName = createAsyncThunk(
  'pokemons/fetchPokemonByName',
  async (name: string) => {
    const response = await getPocemonByName(name);
    return response;
  }
);

const pokemonsSlice = createSlice({
  name: 'pocemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPocemons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPocemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pocemons = [...state.pocemons, ...action.payload.data.results];
        state.page = action.payload.page;
      })
      .addCase(fetchPocemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemon: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemon = action.payload;
      })
      .addCase(fetchPokemonByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

export const pokemonsReducer = pokemonsSlice.reducer;
export const pokemonReducer = pokemonSlice.reducer;
