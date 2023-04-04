// import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import { AppContext } from '../context/AppProvider';
import Recipes from '../components/Recipes';

function MainContent({ title: staticTitle }) {
  // const { helpers: { title } } = useContext(AppContext);
  return (
    <section>
      <Header />
      {
        (staticTitle === 'Meals' || staticTitle === 'Drinks')
          && <Recipes title={ staticTitle } />
      }
    </section>
  );
}

MainContent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MainContent;
