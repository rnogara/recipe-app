import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [meals, setMeals] = useState({ meals: [] });
  const [drinks, setDrinks] = useState({ drinks: [] });
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
    },
  }), [email, setEmail]);
  return (
    <AppContext.Provider value={ state }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
