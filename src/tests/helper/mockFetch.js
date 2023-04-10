import drinks from './apiData/drinks';
import meals from './apiData/meals';
import mealsCategories from './apiData/mealsCategories';
import drinksCategories from './apiData/drinksCategories';

const mockFetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(drinks);
    }

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(meals);
    }

    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve(mealsCategories);
    }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve(drinksCategories);
    }

    return Promise.reject(new Error('Invalid url'));
  },
});

export default mockFetch;
