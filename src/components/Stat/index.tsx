import React from 'react';

const Stat = ({ data }) => {
  return (
    <li className="stat">
      <p>Base stat: {data.base_stat}</p>
      <p>Stat name: {data.stat.name}</p>
    </li>
  );
};

export default Stat;
