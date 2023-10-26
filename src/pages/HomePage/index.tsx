import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPocemons } from '../../state/pokemonSlice';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
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

  return (
    <>
      <div style={{ height: '500px', overflow: 'auto' }} ref={containerRef}>
        <h1>HomePage</h1>
        {pocemonsAll.pocemons.map((pocemon, idx) => (
          <Link key={idx} to={`/${pocemon.name}`}>
            <li>{pocemon.name}</li>
          </Link>
        ))}
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default HomePage;
