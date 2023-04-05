import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppProvider';

function FavoriteRecipes() {
  const { functions: { setTitle } } = useContext(AppContext);

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, []);

  return (
    <section>
      <Header />
    </section>
  );
}

export default FavoriteRecipes;
