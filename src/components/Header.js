import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import SIcon from '../images/searchIcon.svg';
import PIcon from '../images/profileIcon.svg';
import { AppContext } from '../context/AppProvider';

function Header() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const { helpers: { title } } = useContext(AppContext);
  const history = useHistory();

  const searchIcon = (
    <button
      data-testid="header-icons"
      onClick={ () => setIsSearchClicked(!isSearchClicked) }
    >
      <img data-testid="search-top-btn" src={ SIcon } alt="Search Icon" />
    </button>
  );
  return (
    <header>
      <h3>Recipes App</h3>
      <button
        data-testid="header-icons"
        onClick={ () => history.push('/profile') }
      >
        <img data-testid="profile-top-btn" src={ PIcon } alt="Profile Icon" />
      </button>
      { (title === 'Meals' || title === 'Drinks') && searchIcon }
      <h1 data-testid="page-title">{ title }</h1>
      { isSearchClicked && <SearchBar /> }
    </header>
  );
}

export default Header;
