import React from 'react';

import Header from './layouts/Header/index'
import Footer from './layouts/Footer/index'

const App = () => {
  return (
    <div className="layout">
      <Header />
      <div className="layout__content">Main Page</div>
      <Footer />
    </div>
  );
}

export default App;
