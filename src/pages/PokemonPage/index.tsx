import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemonByName } from '../../state/pokemonSlice';
import Move from '../../components/Move';
import Stat from '../../components/Stat';

const PokemonPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useDispatch();
  const pokemonData = useSelector((state) => state.pocemon);

  useEffect(() => {
    dispatch(fetchPokemonByName(name));
  }, [name, dispatch]);

  const isLoading = pokemonData.status !== 'succeeded';

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const { name: pokemonName, id, moves, stats } = pokemonData.pokemon;

  return (
    <div>
      Go <Link to="/">home</Link>
      <div>
        <h1>Pokemon name: {pokemonName}</h1>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={pokemonName}
        />
        <h2>Moves</h2>
        {moves.map((data) => (
          <Move data={data} key={data.move.name} />
        ))}

        <h2>Stats</h2>
        {stats.map((data) => (
          <Stat data={data} key={data.stat.name} />
        ))}
      </div>
    </div>
  );
};

export default PokemonPage;
