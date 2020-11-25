import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <>
      <div className="header">
        <div className="header__item header__item--left">
          <div className="header__decorators">
            <Link to="/" className="header__logo--small">
              <img src="https://trello-attachments.s3.amazonaws.com/5f7f173f3f927d440950a925/5fbe91ca731763484cbf700b/c3ebacb1622b4b0239102414956c34a4/pokemon_circle_bg.png" alt="pokedex-circle" className="header__img" />
            </Link>
            <div className="pokedex__buttons">
              <div className="button button--red" />
              <div className="button button--yellow" />
              <div className="button button--green" />
            </div>
          </div>
        </div>
        <div className="header__item desktop">
          <Link to="/" className="header__logo">
            <img src="https://trello-attachments.s3.amazonaws.com/5f7f173f3f927d440950a925/5fbe91ca731763484cbf700b/c80aad5de1667527b2eff890a69c3f8f/Pok%C3%A9dex_logo.webp" alt="pokedex-logo" className="header__logo-img" />
          </Link>
        </div>
        <div className="header__item">
          <a href="http://admiradigitalsignage.com/" className="header__logo">
            <img src="https://trello-attachments.s3.amazonaws.com/5f7f173f3f927d440950a925/5fbe91ca731763484cbf700b/e133bcae0e3919f6167749461a6e41b1/admira.png" alt="admira-logo" className="header__logo-img" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
