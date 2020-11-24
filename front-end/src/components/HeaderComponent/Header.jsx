import React from 'react';
import './Header.css';

function Header() {
  return (
    <>
      <div className="header">
        <div className="header__item header__item--left">
          <div className="header__decorators">
            <img src="https://sg.portal-pokemon.com/play/resources/pokedex/img/pokemon_circle_bg.png" alt="pokedex-circle" className="header__logo" />
            <div className="pokedex__buttons">
              <div className="button button--red" />
              <div className="button button--yellow" />
              <div className="button button--green" />
            </div>
          </div>
        </div>
        <div className="header__item desktop">
          <img src="https://ianars.github.io/Pok-dex/images/pokedeex.png" alt="pokedex-logo" className="header__logo" />
        </div>
        <div className="header__item">
          <img src="https://lh3.googleusercontent.com/proxy/NJ5skYgeTVmArBLNZzoMOlV758dH9RWRf8ysvNuC44acr6hsAW4oHj8hEHl4JWNfSB-BHa7wdpTso40q-mWyNrh4lR2z4i-W72oA3MeBTB_63nL8LLl4z7EQffevWI7voLp-pR75WWA" alt="admira-logo" className="header__logo" />
        </div>
      </div>
    </>
  );
}

export default Header;
