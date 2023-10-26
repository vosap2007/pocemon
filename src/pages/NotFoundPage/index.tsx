import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1>NotFoundPage</h1>
      Go <Link to="/">home</Link>
    </div>
  );
};

export default NotFoundPage;
