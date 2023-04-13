import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/RenderWithRouter';
import { AppProvider } from '../context/AppProvider';
import Recipes from '../pages/Recipes';
import mockSearchMeals from './helper/mockSearchMeals';
import ingredientMealReturn from './helper/apiData/ingredientMealReturn';
import ingredientDrinkReturn from './helper/apiData/ingredientDrinkReturn';
import mockSearchDrinks from './helper/mockSearchDrinks';
import nameMealReturn from './helper/apiData/nameMealReturn';
import nameDrinkReturn from './helper/apiData/nameDrinkReturn';
import firstLetterMealReturn from './helper/apiData/firstLetterMealReturn';
import firstLetterDrinkReturn from './helper/apiData/firstLetterDrinkReturn';
import ingredientOneMealReturn from './helper/apiData/ingredientOneMealReturn';
import ingredientOneDrinkReturn from './helper/apiData/ingredientOneDrinkReturn';
import nameOneMealReturn from './helper/apiData/nameOneMealReturn';
import nameOneDrinkReturn from './helper/apiData/nameOneDrinkReturn';
import firstLetterOneMealReturn from './helper/apiData/firstLetterOneMealReturn';
import firstLetterOneDrinkReturn from './helper/apiData/firstLetterOneDrinkReturn';
import App from '../App';

const searchTestId = 'search-top-btn';
const textInputTestId = 'search-input';
const ingredientBtnTestId = 'ingredient-search-radio';
const nameBtnTestId = 'name-search-radio';
const firstLetterBtnTestId = 'first-letter-search-radio';
const searchBtnTitle = 'Search';
const URL_MEALS_INGRENDIENT_RESULTS = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=tomato';
const URL_DRINKS_INGRENDIENT_RESULTS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin';
const URL_MEALS_NAME_RESULTS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=potato';
const URL_DRINKS_NAME_RESULTS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Blood';
const URL_MEALS_FIRST_LETTER_RESULTS = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
const URL_DRINKS_FIRST_LETTER_RESULTS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=i';
const URL_MEAL_INGRENDIENT_ONE_RESULT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=brussels sprouts';
const URL_DRINK_INGRENDIENT_ONE_RESULT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=curaçao';
const URL_MEAL_NAME_ONE_RESULT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Tofu';
const URL_DRINK_NAME_ONE_RESULT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Bloody Mary';
const URL_MEAL_FIRST_LETTER_ONE_RESULT = 'https://www.themealdb.com/api/json/v1/1/search.php?f=y';
const URL_DRINK_FIRST_LETTER_ONE_RESULT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=4';

describe('Testa o componente SearchBar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Testa se os elementos renderizam', async () => {
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const searchIcon = screen.getByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const nameRadioBtn = await screen.findByTestId(nameBtnTestId);
    const firstLetterRadioBtn = await screen.findByTestId(firstLetterBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    expect(textInput).toBeInTheDocument();
    expect(ingredientRadioBtn).toBeInTheDocument();
    expect(nameRadioBtn).toBeInTheDocument();
    expect(firstLetterRadioBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  it('Testa se no Meals ao pesquisar por ingrediente com mais de um resultado renderiza eles', async () => {
    global.fetch = jest.fn(mockSearchMeals);
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const searchIcon = screen.getByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    userEvent.type(textInput, 'tomato');
    userEvent.click(ingredientRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_MEALS_INGRENDIENT_RESULTS);

    const result = await fetch(URL_MEALS_INGRENDIENT_RESULTS);
    const data = await result.json();
    expect(data).toEqual(ingredientMealReturn);
  });
  it('Testa se no Drinks ao pesquisar por ingrediente com mais de um resultado renderiza eles', async () => {
    global.fetch = jest.fn(mockSearchDrinks);
    renderWithRouter(<AppProvider><Recipes title="Drinks" /></AppProvider>);

    const searchIcon = screen.getByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    userEvent.type(textInput, 'gin');
    userEvent.click(ingredientRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_DRINKS_INGRENDIENT_RESULTS);

    const result = await fetch(URL_DRINKS_INGRENDIENT_RESULTS);
    const data = await result.json();
    expect(data).toEqual(ingredientDrinkReturn);
  });
  it('Testa se no Meals ao pesquisar por nome com mais de um resultado renderiza eles', async () => {
    global.fetch = jest.fn(mockSearchMeals);
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const searchIcon = screen.getByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const nameRadioBtn = await screen.findByTestId(nameBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    userEvent.type(textInput, 'potato');
    userEvent.click(nameRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_MEALS_NAME_RESULTS);

    const result = await fetch(URL_MEALS_NAME_RESULTS);
    const data = await result.json();
    expect(data).toEqual(nameMealReturn);
  });
  it('Testa se no Drinks ao pesquisar por nome com mais de um resultado renderiza eles', async () => {
    global.fetch = jest.fn(mockSearchDrinks);
    renderWithRouter(<AppProvider><Recipes title="Drinks" /></AppProvider>);

    const searchIcon = screen.getByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const nameRadioBtn = await screen.findByTestId(nameBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    userEvent.type(textInput, 'Blood');
    userEvent.click(nameRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_DRINKS_NAME_RESULTS);

    const result = await fetch(URL_DRINKS_NAME_RESULTS);
    const data = await result.json();
    expect(data).toEqual(nameDrinkReturn);
  });
  it('Testa se no Meals ao pesquisar por primeira letra com mais de um resultado renderiza eles', async () => {
    global.fetch = jest.fn(mockSearchMeals);
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const searchIcon = screen.getByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const firstLetterRadioBtn = await screen.findByTestId(firstLetterBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    userEvent.type(textInput, 'a');
    userEvent.click(firstLetterRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_MEALS_FIRST_LETTER_RESULTS);

    const result = await fetch(URL_MEALS_FIRST_LETTER_RESULTS);
    const data = await result.json();
    expect(data).toEqual(firstLetterMealReturn);
  });
  it('Testa se no Drinks ao pesquisar por primeira letra com mais de um resultado renderiza eles', async () => {
    global.fetch = jest.fn(mockSearchDrinks);
    renderWithRouter(<AppProvider><Recipes title="Drinks" /></AppProvider>);

    const searchIcon = screen.getByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const firstLetterRadioBtn = await screen.findByTestId(firstLetterBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    userEvent.type(textInput, 'i');
    userEvent.click(firstLetterRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_DRINKS_FIRST_LETTER_RESULTS);

    const result = await fetch(URL_DRINKS_FIRST_LETTER_RESULTS);
    const data = await result.json();
    expect(data).toEqual(firstLetterDrinkReturn);
  });
  it('Testa se no Meals ao pesquisar por ingrediente com um só resultado, ele renderiza na pagina Details', async () => {
    global.fetch = jest.fn(mockSearchMeals);
    const { history } = renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const searchIcon = await screen.findByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    userEvent.type(textInput, 'Brussels Sprouts');
    userEvent.click(ingredientRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_MEAL_INGRENDIENT_ONE_RESULT);

    const result = await fetch(URL_MEAL_INGRENDIENT_ONE_RESULT);
    const data = await result.json();
    expect(data).toEqual(ingredientOneMealReturn);

    waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52885');
      const mealName = screen.getByText('Bubble & Squeak');
      expect(mealName).toBeInTheDocument();
    });
  });
  it('Testa se no Drinks ao pesquisar por ingrediente com um só resultado, ele renderiza na pagina Details', async () => {
    global.fetch = jest.fn(mockSearchDrinks);
    const { history } = renderWithRouter(<AppProvider><Recipes title="Drinks" /></AppProvider>);

    history.push('/drinks');

    waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });

    const searchIcon = await screen.findByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: 'Search' });

    userEvent.type(textInput, 'curaçao');
    userEvent.click(ingredientRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_DRINK_INGRENDIENT_ONE_RESULT);

    const result = await fetch(URL_DRINK_INGRENDIENT_ONE_RESULT);
    const data = await result.json();
    expect(data).toEqual(ingredientOneDrinkReturn);

    waitFor(() => {
      expect(history.location.pathname).toBe('/meals/12138');
      const drinkName = screen.getByText('Scotch Cobbler');
      expect(drinkName).toBeInTheDocument();
    });
  });
  it('Testa se no Meals ao pesquisar por nome com um só resultado, ele renderiza na pagina Details', async () => {
    global.fetch = jest.fn(mockSearchMeals);
    const { history } = renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const searchIcon = await screen.findByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const nameRadioBtn = await screen.findByTestId(nameBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    userEvent.type(textInput, 'Tofu');
    userEvent.click(nameRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_MEAL_NAME_ONE_RESULT);

    const result = await fetch(URL_MEAL_NAME_ONE_RESULT);
    const data = await result.json();
    expect(data).toEqual(nameOneMealReturn);

    waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52947');
      const mealName = screen.getByText('Ma Po Tofu');
      expect(mealName).toBeInTheDocument();
    });
  });
  it('Testa se no Drinks ao pesquisar por nome com um só resultado, ele renderiza na pagina Details', async () => {
    global.fetch = jest.fn(mockSearchDrinks);
    const { history } = renderWithRouter(<AppProvider><Recipes title="Drinks" /></AppProvider>);

    history.push('/drinks');

    waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });

    const searchIcon = await screen.findByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const nameRadioBtn = await screen.findByTestId(nameBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: 'Search' });

    userEvent.type(textInput, 'Bloody Mary');
    userEvent.click(nameRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_DRINK_NAME_ONE_RESULT);

    const result = await fetch(URL_DRINK_NAME_ONE_RESULT);
    const data = await result.json();
    expect(data).toEqual(nameOneDrinkReturn);

    waitFor(() => {
      expect(history.location.pathname).toBe('/meals/12138');
      const drinkName = screen.getByText('Scotch Cobbler');
      expect(drinkName).toBeInTheDocument();
    });
  });
  it('Testa se no Meals ao pesquisar por primeira letra com um só resultado, ele renderiza na pagina Details', async () => {
    global.fetch = jest.fn(mockSearchMeals);
    const { history } = renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const searchIcon = await screen.findByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const firstLetterRadioBtn = await screen.findByTestId(firstLetterBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    userEvent.type(textInput, 'y');
    userEvent.click(firstLetterRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_MEAL_FIRST_LETTER_ONE_RESULT);

    const result = await fetch(URL_MEAL_FIRST_LETTER_ONE_RESULT);
    const data = await result.json();
    expect(data).toEqual(firstLetterOneMealReturn);

    waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52871');
      const mealName = screen.getByText('Yaki Udon');
      expect(mealName).toBeInTheDocument();
    });
  });
  it('Testa se no Drinks ao pesquisar por primeira letra com um só resultado, ele renderiza na pagina Details', async () => {
    global.fetch = jest.fn(mockSearchDrinks);
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);

    history.push('/drinks');

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });

    const searchIcon = await screen.findByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const firstLetterRadioBtn = await screen.findByTestId(firstLetterBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: 'Search' });

    userEvent.type(textInput, '4');
    userEvent.click(firstLetterRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_DRINK_FIRST_LETTER_ONE_RESULT);

    const result = await fetch(URL_DRINK_FIRST_LETTER_ONE_RESULT);
    const data = await result.json();
    expect(data).toEqual(firstLetterOneDrinkReturn);

    const id = data.drinkId;
    history.push(`/drinks/${id}`);
    expect(history.location.pathname).toBe('/drinks/13581');

    await waitFor(() => {
      const drinkName = screen.getByText('410 Gone');
      expect(drinkName).toBeInTheDocument();
    });

  });
  it('Testa se ao pesquisar por primeira letra com dois caracteres ele envia o alerta', async () => {
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const searchIcon = await screen.findByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const firstLetterRadioBtn = await screen.findByTestId(firstLetterBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    userEvent.type(textInput, 'aa');
    userEvent.click(firstLetterRadioBtn);
    userEvent.click(searchBtn);

    const error = 'Your search must have only 1 (one) character';
    waitFor(() => {
      expect(error).toBeVisible();
    });
  });
  it('Testa se no Meals ao pesquisar por nenhum resultado, ele envia o alerta', async () => {
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const searchIcon = await screen.findByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    userEvent.type(textInput, 'xablau');
    userEvent.click(ingredientRadioBtn);
    userEvent.click(searchBtn);

    const error = 'Sorry, we haven\'t found any recipes for these filters.';
    waitFor(() => {
      expect(error).toBeVisible();
    });
  });
  it('Testa se no Drinks  ao pesquisar por nenhum resultado, ele envia o alerta', async () => {
    renderWithRouter(<AppProvider><Recipes title="Drinks" /></AppProvider>);

    const searchIcon = await screen.findByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId(textInputTestId);
    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const searchBtn = await screen.findByRole('button', { name: searchBtnTitle });

    userEvent.type(textInput, 'xablau');
    userEvent.click(ingredientRadioBtn);
    userEvent.click(searchBtn);

    const error = 'Sorry, we haven\'t found any recipes for these filters.';

    waitFor(() => {
      expect(error).toBeVisible();
    });
  });
});
