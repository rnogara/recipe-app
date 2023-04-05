import React, { useEffect, useState } from 'react';
// import useFetch from '../hooks/useFetch';

function SearchBar() {
  const [option, setOption] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (option === 'first-letter-search-radio' && searchText.length > 1) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [searchText, option]);

  const handleSearchBtn = () => {
    // useFetch();
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
            value="ingredient-search-radio"
            type="radio"
            name="option"
            data-testid="ingredient-search-radio"
            onClick={ ({ target }) => setOption(target.value) }
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            value="name-search-radio"
            type="radio"
            name="option"
            data-testid="name-search-radio"
            onClick={ ({ target }) => setOption(target.value) }
          />
        </label>
        <label htmlFor="first-letter">
          Primeira Letra
          <input
            value="first-letter-search-radio"
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
