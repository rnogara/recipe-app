import React, { useContext } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppProvider';
import Recipes from '../components/Recipes';

function MainContent() {
  const { helpers: { title } } = useContext(AppContext);
  return (
    <section>
      <Header />
      {
        (title === 'Meals' || title === 'Drinks') && <Recipes />
      }
    </section>
  );
}

export default MainContent;
