import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/RenderWithRouter';
import { AppProvider } from '../context/AppProvider';
import Recipes from '../pages/Recipes';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Profile from '../pages/Profile';
import App from '../App';

const searchTestId = 'search-top-btn';
const iconstestId = 'header-icons';

describe('Testa o componente Header', () => {
  it('Testa se os elementos renderizam', () => {
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId(searchTestId);
    const pageTitle = screen.getByTestId('page-title');

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('Testa se o botão search aparece na rota Meals', () => {
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const searchIcon = screen.getByTestId(searchTestId);
    expect(searchIcon).toBeInTheDocument();
  });
  it('Testa se o botão search aparece na rota Drinks', () => {
    renderWithRouter(<AppProvider><Recipes title="Drinks" /></AppProvider>);

    const drinksTitle = screen.getByText('Drinks');
    expect(drinksTitle).toBeInTheDocument();

    const searchIcon = screen.getByTestId(searchTestId);
    expect(searchIcon).toBeInTheDocument();
  });
  it('Testa se o botão search ao clicar aparece a searchbar', async () => {
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const searchIcon = screen.getByTestId(searchTestId);
    userEvent.click(searchIcon);

    const searchBtn = await screen.findByRole('button', { name: 'Search' });
    expect(searchBtn).toBeInTheDocument();
  });
  it('Testa se o botão search não aparece na pagina DoneRecipes', () => {
    renderWithRouter(<AppProvider><DoneRecipes /></AppProvider>);

    const icons = screen.getAllByTestId(iconstestId);
    expect(icons).toHaveLength(1);
  });
  it('Testa se o botão search não aparece na pagina FavoriteRecipes', () => {
    renderWithRouter(<AppProvider><FavoriteRecipes /></AppProvider>);

    const icons = screen.getAllByTestId(iconstestId);
    expect(icons).toHaveLength(1);
  });
  it('Testa se o botão search não aparece na pagina Profile', () => {
    renderWithRouter(<AppProvider><Profile /></AppProvider>);

    const icons = screen.getAllByTestId(iconstestId);
    expect(icons).toHaveLength(1);
  });
  it('Testa se o botão profile vai para a rota /profile', async () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByRole('button', { name: 'Enter' });

    userEvent.type(emailInput, 'teste@alguem.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    const profileIcon = await screen.findByTestId('profile-top-btn');
    userEvent.click(profileIcon);

    const profileTitle = await screen.findByText('Profile');
    expect(profileTitle).toBeInTheDocument();
  });
});
