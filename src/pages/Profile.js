import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppProvider';
import Footer from '../components/Footer';

function Profile() {
  const { functions: { setTitle } } = useContext(AppContext);

  useEffect(() => {
    setTitle('Profile');
  }, []);

  return (
    <section>
      <Header />
      <Footer />
    </section>
  );
}

export default Profile;
