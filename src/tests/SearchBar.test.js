import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/RenderWithRouter';
import { AppProvider } from '../context/AppProvider';
import Recipes from '../pages/Recipes';
import mockSearchMeals from './helper/mockSearchMeals';
import ingredientMealReturn from './helper/apiData/ingredientMealReturn';
// import mockSearchDrinks from './helper/mockSearchDrinks';

const searchTestId = 'search-top-btn';
const URL_MEALS_INGRENDIENT_RESULTS = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=tomato';

describe('Testa o componente SearchBar', () => {
  it('Testa se os elementos renderizam', async () => {
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const searchIcon = screen.getByTestId(searchTestId);
    userEvent.click(searchIcon);

    const textInput = await screen.findByTestId('search-input');
    const ingredientRadioBtn = await screen.findByTestId('ingredient-search-radio');
    const nameRadioBtn = await screen.findByTestId('name-search-radio');
    const firstLetterRadioBtn = await screen.findByTestId('first-letter-search-radio');
    const searchBtn = await screen.findByRole('button', { name: 'Search' });

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

    const textInput = await screen.findByTestId('search-input');
    const ingredientRadioBtn = await screen.findByTestId('ingredient-search-radio');
    const searchBtn = await screen.findByRole('button', { name: 'Search' });

    userEvent.type(textInput, 'tomato');
    userEvent.click(ingredientRadioBtn);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(URL_MEALS_INGRENDIENT_RESULTS);

    const result = await fetch(URL_MEALS_INGRENDIENT_RESULTS);
    const data = await result.json();
    expect(data).toEqual(ingredientMealReturn);
  });
  it('Testa se no Drinks ao pesquisar por ingrediente com mais de um resultado renderiza eles', async () => {
  });
  it('Testa se no Meals ao pesquisar por nome com mais de um resultado renderiza eles', async () => {
  });
  it('Testa se no Drinks ao pesquisar por nome com mais de um resultado renderiza eles', async () => {
  });
  it('Testa se no Meals ao pesquisar por primeira letra com mais de um resultado renderiza eles', async () => {
  });
  it('Testa se no Drinks ao pesquisar por primeira letra com mais de um resultado renderiza eles', async () => {
  });
  it('Testa se no Meals ao pesquisar por ingrediente com um só resultado, ele renderiza na pagina Details', async () => {
  });
  it('Testa se no Drinks ao pesquisar por ingrediente com um só resultado, ele renderiza na pagina Details', async () => {
  });
  it('Testa se no Meals ao pesquisar por nome com um só resultado, ele renderiza na pagina Details', async () => {
  });
  it('Testa se no Drinks ao pesquisar por nome com um só resultado, ele renderiza na pagina Details', async () => {
  });
  it('Testa se no Meals ao pesquisar por primeira letra com um só resultado, ele renderiza na pagina Details', async () => {
  });
  it('Testa se no Drinks ao pesquisar por primeira letra com um só resultado, ele renderiza na pagina Details', async () => {
  });
  it('Testa se ao pesquisar por primeira letra com dois caracteres ele envia o alerta', () => {
  });
  it('Testa se no Meals ao pesquisar por nenhum resultado, ele envia o alerta', () => {
  });
  it('Testa se no Drinks  ao pesquisar por nenhum resultado, ele envia o alerta', () => {
  });
});
