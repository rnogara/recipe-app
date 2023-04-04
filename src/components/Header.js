import React, { useContext } from 'react';
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
      data-testid="search-top-btn"
      onClick={ () => setIsSearchClicked(!isSearchClicked) }
    >
      {SIcon}
    </button>
  );
  return (
    <header>
      <h3>Recipes App</h3>
      <button
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      >
        {PIcon}
      </button>
      { (title === 'Meals' || title === 'Drinks') && searchIcon }
      <h1 data-testid="page-title">{ title }</h1>
      { isSearchClicked && <SearchBar /> }
    </header>
  );
}

export default Header;
