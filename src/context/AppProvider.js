import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [meals, setMeals] = useState({ meals: [] });
  const [drinks, setDrinks] = useState({ drinks: [] });
  const [title, setTitle] = useState('');
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
    },
    helpers: {
      title,
    },
  }), [email, title, drinks, meals, setEmail, setTitle, setDrinks, setMeals]);
  return (
    <AppContext.Provider value={ state }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
