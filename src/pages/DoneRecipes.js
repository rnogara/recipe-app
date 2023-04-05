import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppProvider';

function DoneRecipes() {
  const { functions: { setTitle } } = useContext(AppContext);

  useEffect(() => {
    setTitle('Done Recipes');
  }, []);

  return (
    <section>
      <Header />
    </section>
  );
}

export default DoneRecipes;
