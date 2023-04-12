import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppProvider';

function Profile() {
  const { functions: { setTitle } } = useContext(AppContext);
  const [emailState, setEmailState] = useState('loading...');

  useEffect(() => {
    setTitle('Profile');
    const { email } = JSON.parse(localStorage.getItem('user'));
    setEmailState(email);
  }, []);

  return (
    <section>
      <Header />
      <h3 data-testid="profile-email">
        { emailState }
      </h3>
      <button data-testid="profile-done-btn">Done Recipes</button>
      <button data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button data-testid="profile-logout-btn">Logout</button>

    </section>
  );
}

export default Profile;
