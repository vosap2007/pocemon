import React from 'react';

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className="footer">
      <div className="footer__data">
        <p className="footer__text">© {year} by Volodymyr Udovychenko</p>
      </div>
    </footer>
  );
};

export default Footer;