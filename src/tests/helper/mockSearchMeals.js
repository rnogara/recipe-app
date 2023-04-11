import firstLetterMealReturn from './apiData/firstLetterMealReturn';
import firstLetterOneMealReturn from './apiData/firstLetterOneMealReturn';
import ingredientMealReturn from './apiData/ingredientMealReturn';
import ingredientOneMealReturn from './apiData/ingredientOneMealReturn';
import nameMealReturn from './apiData/nameMealReturn';
import nameOneMealReturn from './apiData/nameOneMealReturn';

const mockSearchMeals = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=potato') {
      return Promise.resolve(nameMealReturn);
    }

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Tofu') {
      return Promise.resolve(nameOneMealReturn);
    }

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=a') {
      return Promise.resolve(firstLetterMealReturn);
    }

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=y') {
      return Promise.resolve(firstLetterOneMealReturn);
    }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=tomato') {
      return Promise.resolve(ingredientMealReturn);
    }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Brussels%20Sprouts') {
      return Promise.resolve(ingredientOneMealReturn);
    }

    return Promise.reject(new Error('Invalid url'));
  },
});

export default mockSearchMeals;
