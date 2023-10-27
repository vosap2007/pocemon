import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPocemons } from '../../state/pokemonSlice';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const pocemonsAll = useSelector((state) => state.pocemons);

  useEffect(() => {
    dispatch(fetchPocemons(pocemonsAll.page + 1) as any);
  }, [dispatch]);

  useEffect(() => {
    if (pocemonsAll.status === 'succeeded') {
      setIsLoading(false);
    }
  }, [pocemonsAll.status]);

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight &&
      !isLoading
    ) {
      setIsLoading(true);
      dispatch(fetchPocemons(pocemonsAll.page + 1) as any);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  const filteredPocemons = pocemonsAll.pocemons.filter((pocemon) =>
    pocemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home" ref={containerRef}>
      <div className="home__top">
        <h1 className="home__top__title">POKEMONS</h1>
        <input
          type="text"
          className="home__top__input"
          placeholder="Search Pocemons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="home__list">
        {filteredPocemons.map((pocemon, idx) => (
          <Link key={idx} to={`/${pocemon.name}`}>
            <li className="home__list__pocemon">{pocemon.name}</li>
          </Link>
        ))}
      </div>

      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default HomePage;
