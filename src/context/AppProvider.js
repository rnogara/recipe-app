import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [title, setTitle] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')) || []);
  const state = useMemo(() => ({
    user: {
      email,
    },
    apiResponse: {
      meals,
      drinks,
    },
    functions: {
      setEmail,
      setDrinks,
      setMeals,
      setTitle,
      setFavoriteRecipes,
    },
    helpers: {
      title,
    },
    favoriteRecipes,
  }), [email, title, drinks, meals, setEmail,
    setTitle, setDrinks, setMeals, favoriteRecipes]);
  return (
    <AppContext.Provider value={ state }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
