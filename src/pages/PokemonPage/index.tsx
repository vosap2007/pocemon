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
    <div className="pokemon">
      <div className="pokemon__back">
        <Link to="/">
          <span>&larr;</span> назад
        </Link>
      </div>

      <div className="pokemon__top">
        <h1 className="pokemon__top__title">
          Pokemon name: <span>{pokemonName}</span>
        </h1>
        <img
          className="pokemon__img"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={pokemonName}
        />
      </div>
      <div className="pokemon__info">
        <div>
          <h2 className="pokemon__info__title">Moves</h2>
          {moves.map((data) => (
            <Move data={data} key={data.move.name} />
          ))}
        </div>

        <div>
          <h2 className="pokemon__info__title">Stats</h2>
          {stats.map((data) => (
            <Stat data={data} key={data.stat.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
