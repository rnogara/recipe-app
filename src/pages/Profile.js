import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { AppContext } from '../context/AppProvider';
import Footer from '../components/Footer';

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
    <section>
      <Header />
      <h3 data-testid="profile-email">
        { emailState }
      </h3>
      <button
        data-testid="profile-done-btn"
        onClick={ () => redirector('done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => redirector('favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ () => redirector('') }
      >
        Logout
      </button>
      <Footer />
    </section>
  );
}

export default Profile;
