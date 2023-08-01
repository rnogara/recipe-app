import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import SIcon from '../images/icone pesquiar.png';
import PIcon from '../images/icone-perfil.png';
import { AppContext } from '../context/AppProvider';
import logo from '../images/food.png';
// import foodIcon from '../images/icone-prato.png';
// import drinkIcon from '../images/icone-bebida.png';
import headerIcons from '../helpers/headerIcons';
import '../styles/Header.css';

function Header() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const { helpers: { title } } = useContext(AppContext);
  const history = useHistory();

  const searchIcon = (
    <button
      className="header-btn"
      data-testid="header-icons"
      onClick={ () => setIsSearchClicked(!isSearchClicked) }
    >
      <img
        className="header-icon"
        data-testid="search-top-btn"
        src={ SIcon }
        alt="Search Icon"
      />
    </button>
  );
  return (
    <header className="header-wrapper">
      <div className="header-container">
        <div className="header-logo">
          <img className="header-logo-img" src={ logo } alt="logo" />
          <h3 className="header-logo-name">Recipe App</h3>
        </div>
        { (title === 'Meals' || title === 'Drinks') && searchIcon }
        <button
          className="header-btn"
          data-testid="header-icons"
          onClick={ () => history.push('/profile') }
        >
          <img
            className="header-icon"
            data-testid="profile-top-btn"
            src={ PIcon }
            alt="Profile Icon"
          />
        </button>
      </div>
      <img
        className="page-icon"
        src={ headerIcons[title.split(' ')[0]] }
        alt="Icone da página"
      />
      <h1 className="page-title" data-testid="page-title">{ title }</h1>
      { isSearchClicked && <SearchBar /> }
    </header>
  );
}

export default Header;
