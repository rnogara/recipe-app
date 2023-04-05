import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/RenderWithRouter';
import { AppProvider } from '../context/AppProvider';
import Recipes from '../pages/Recipes';
import mockFetch from './helper/mockFetch';

const URL_MEALS_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

describe('Testando a tela de Receitas', () => {
  it('Executa o fetch das comidas?', () => {
    global.fetch = jest.fn(mockFetch);
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledWith(URL_MEALS_API);
  });

  it('As receitas de comida estão sendo renderizadas?', async () => {
    global.fetch = jest.fn(mockFetch);
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledWith(URL_MEALS_API);
    await waitForElementToBeRemoved(() => screen.getByRole('heading', { name: 'Loading...' }));
    screen.logTestingPlaygroundURL();
    const recipeTitle = screen.getByRole('heading', { level: 4, name: 'Corba' });
    expect(recipeTitle).toBeDefined();
    expect(recipeTitle).toBeInTheDocument();
  });

  it('O botão de categoria está sendo renderizado?', async () => {
    global.fetch = jest.fn(mockFetch);
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);
    await waitForElementToBeRemoved(() => screen.getByRole('heading', { name: 'Loading...' }));
    const categoryButton = screen.getByRole('button', { name: 'Beef' });
    expect(categoryButton).toBeDefined();
    expect(categoryButton).toBeInTheDocument();
    const categoryButtons = screen.getAllByRole('button');
    expect(categoryButtons).toBeDefined();
  });

  it('Executa o fetch das bebidas?', () => {
    global.fetch = jest.fn(mockFetch);
    renderWithRouter(<AppProvider><Recipes title="Drinks" /></AppProvider>);
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledWith(URL_DRINKS_API);
  });
});
