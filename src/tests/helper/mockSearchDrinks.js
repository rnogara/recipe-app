import firstLetterDrinkReturn from './apiData/firstLetterDrinkReturn';
import firstLetterOneDrinkReturn from './apiData/firstLetterOneDrinkReturn';
import ingredientDrinkReturn from './apiData/ingredientDrinkReturn';
import ingredientOneDrinkReturn from './apiData/ingredientOneDrinkReturn';
import nameDrinkReturn from './apiData/nameDrinkReturn';
import nameOneDrinkReturn from './apiData/nameOneDrinkReturn';

const mockSearchDrinks = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Blood') {
      return Promise.resolve(nameDrinkReturn);
    }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Bloody Mary') {
      return Promise.resolve(nameOneDrinkReturn);
    }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=i') {
      return Promise.resolve(firstLetterDrinkReturn);
    }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=4') {
      return Promise.resolve(firstLetterOneDrinkReturn);
    }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin') {
      return Promise.resolve(ingredientDrinkReturn);
    }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=curaçao') {
      return Promise.resolve(ingredientOneDrinkReturn);
    }

    return Promise.reject(new Error('Invalid url'));
  },
});

export default mockSearchDrinks;
