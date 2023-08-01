import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Check from '../images/Check.png';
import Favorites from '../images/Favorites.png';
import Logout from '../images/Logout.png';
import { AppContext } from '../context/AppProvider';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const { functions: { setTitle } } = useContext(AppContext);
  const [emailState, setEmailState] = useState('loading...');
  const { push } = useHistory();

  useEffect(() => {
    setTitle('Profile');
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      setEmailState(email);
    }
  }, []);

  const redirector = (end) => {
    if (end === '') localStorage.clear();
    push(`/${end}`);
  };

  return (
    <section
      className="profile-wrapper"
    >
      <Header />
      <div className="profile-title">
        <p>{ emailState }</p>
      </div>
      <section
        className="profile-btn-wrapper"
      >
        <button
          className="profile-btn align-img-text"
          data-testid="profile-done-btn"
          onClick={ () => redirector('done-recipes') }
        >
          <img src={ Check } alt="done-check icon" />
          <span>Done Recipes</span>
        </button>
        <button
          className="profile-btn fav align-img-text"
          data-testid="profile-favorite-btn"
          onClick={ () => redirector('favorite-recipes') }
        >
          <img src={ Favorites } alt="favorite icon" />
          <span>Favorite Recipes</span>
        </button>
        <button
          className="profile-btn align-img-text"
          data-testid="profile-logout-btn"
          onClick={ () => redirector('') }
        >
          <img src={ Logout } alt="logout icon" />
          <span>Logout</span>
        </button>
      </section>
      <Footer />
    </section>
  );
}

export default Profile;
