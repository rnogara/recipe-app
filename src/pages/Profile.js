import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppProvider';

function Profile() {
  const { functions: { setTitle } } = useContext(AppContext);

  useEffect(() => {
    setTitle('Profile');
  }, []);

  return (
    <section>
      <Header />
    </section>
  );
}

export default Profile;
