import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { AppContext } from '../context/AppProvider';

function SearchBar() {
  const history = useHistory();
  const [option, setOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const { helpers: { title }, functions } = useContext(AppContext);
  const [, , result, fetchData] = useFetch('');
  const firstLetter = 'first-letter';

  useEffect(() => {
    const fetchedData = result.meals || result.drinks;
    if (Object.keys(result).length === 1 && Object.values(result)[0] == null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (fetchedData !== undefined && fetchedData.length === 1) {
      if (title === 'Meals') {
        const dataForId = result.meals[0];
        history.push(`/meals/${dataForId.idMeal}`);
      }
      if (title === 'Drinks') {
        const dataForId = result.drinks[0];
        history.push(`/drinks/${dataForId.idDrink}`);
      }
    }
    if (fetchedData !== undefined && fetchedData.length > 1) {
      functions[`set${title}`](result[title.toLowerCase()]);
    }
  }, [result]);

  const handleMealFetch = () => {
    switch (option) {
    case 'name':
      return fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
    case firstLetter:
      return fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText.toLowerCase()}`);
    default:
      return fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText.toLowerCase()}`);
    }
  };

  const handleDrinksFetch = () => {
    switch (option) {
    case 'name':
      return fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`);
    case firstLetter:
      return fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText.toLowerCase()}`);
    default:
      return fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText.toLowerCase()}`);
    }
  };

  const handleSearchBtn = () => {
    if (option === firstLetter && searchText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (title === 'Meals') {
      handleMealFetch();
    }
    if (title === 'Drinks') {
      handleDrinksFetch();
    }
  };

  return (
    <section>
      <div>
        <input
          type="text"
          placeholder="Digite sua pesquisa"
          data-testid="search-input"
          value={ searchText }
          onChange={ ({ target }) => setSearchText(target.value) }
        />
        <label htmlFor="ingredients">
          Ingredientes
          <input
            value="ingredient"
            type="radio"
            name="option"
            data-testid="ingredient-search-radio"
            onClick={ ({ target }) => setOption(target.value) }
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            value="name"
            type="radio"
            name="option"
            data-testid="name-search-radio"
            onClick={ ({ target }) => setOption(target.value) }
          />
        </label>
        <label htmlFor="first-letter">
          Primeira Letra
          <input
            value="first-letter"
            type="radio"
            name="option"
            data-testid="first-letter-search-radio"
            onClick={ ({ target }) => setOption(target.value) }
          />
        </label>
      </div>
      <button data-testid="exec-search-btn" onClick={ handleSearchBtn }>Search</button>
    </section>
  );
}

export default SearchBar;
