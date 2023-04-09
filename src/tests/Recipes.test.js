import React from 'react';
import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/RenderWithRouter';
import { AppProvider } from '../context/AppProvider';
import Recipes from '../pages/Recipes';
import mockFetch from './helper/mockFetch';

const URL_MEALS_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const URL_DRINKS_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const URL_MEALS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

describe('Testando a tela de Receitas', () => {
  it('Executa o fetch das comidas?', () => {
    global.fetch = jest.fn(mockFetch);
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);
    expect(fetch).toBeCalledWith(URL_MEALS_CATEGORIES);
    expect(fetch).toBeCalledWith(URL_MEALS_API);
    expect(fetch).toBeCalledTimes(2);
  });

  it('As receitas de comida estão sendo renderizadas?', async () => {
    global.fetch = jest.fn(mockFetch);
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);
    await waitForElementToBeRemoved(() => screen.getAllByRole('heading', { name: 'Loading...' }));
    await waitFor(() => screen.getByRole('heading', { level: 4, name: 'Corba' }));
    screen.logTestingPlaygroundURL();
    const recipeTitle = screen.getByRole('heading', { level: 4, name: 'Corba' });
    expect(recipeTitle).toBeDefined();
    expect(recipeTitle).toBeInTheDocument();
  });

  it('O botão de categoria está sendo renderizado?', async () => {
    global.fetch = jest.fn(mockFetch);
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);
    await waitForElementToBeRemoved(() => screen.getAllByRole('heading', { name: 'Loading...' }));
    const categoryButton = screen.getByRole('button', { name: 'Beef' });
    expect(categoryButton).toBeDefined();
    expect(categoryButton).toBeInTheDocument();
    const categoryButtons = screen.getAllByRole('button');
    expect(categoryButtons).toBeDefined();
  });

  it('Executa o fetch das bebidas?', () => {
    global.fetch = jest.fn(mockFetch);
    renderWithRouter(<AppProvider><Recipes title="Drinks" /></AppProvider>);
    expect(fetch).toBeCalledWith(URL_DRINKS_API);
    expect(fetch).toBeCalledWith(URL_DRINKS_CATEGORIES);
    expect(fetch).toBeCalledTimes(2);
  });
});
