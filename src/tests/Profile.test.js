import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/RenderWithRouter';
import { AppProvider } from '../context/AppProvider';
import App from '../App';

const emailTest = 'email-input';
const passTest = 'password-input';
const loginTest = 'login-submit-btn';

describe('Testa as features do componente Profile', () => {
  it('Testa se todos os elementos estão presentes na página do profile e se é redirecionado à página done recipes', () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);
    const email = screen.getByTestId(emailTest);
    const pass = screen.getByTestId(passTest);
    const enter = screen.getByTestId(loginTest);
    userEvent.type(email, 'teste@trybe.com');
    userEvent.type(pass, '123456789');
    userEvent.click(enter);

    const Btns = screen.getAllByRole('button');
    userEvent.click(Btns[0]);

    const emailProfile = screen.getByText(/Profile/i);
    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    expect(emailProfile).toBeVisible();
    expect(doneRecipesBtn).toBeVisible();
    expect(logoutBtn).toBeVisible();
    expect(favoriteRecipesBtn).toBeVisible();
    userEvent.click(doneRecipesBtn);

    const doneRecipes = screen.getByRole('heading', { name: /Done Recipes/i });
    expect(doneRecipes).toBeVisible();
  });
  it('Testa se todos os elementos estão presentes na página do profile e se é redirecionado à página Favorite recipes', () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);
    const email = screen.getByTestId(emailTest);
    const pass = screen.getByTestId(passTest);
    const enter = screen.getByTestId(loginTest);
    userEvent.type(email, 'testea@trybe.com');
    userEvent.type(pass, '123456789');
    userEvent.click(enter);

    const Btns = screen.getAllByRole('button');
    userEvent.click(Btns[0]);

    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });
    expect(favoriteRecipesBtn).toBeVisible();
    userEvent.click(favoriteRecipesBtn);

    const favorite = screen.getByRole('heading', { name: /Favorite Recipes/i });
    expect(favorite).toBeVisible();
  });
  it('Testa se todos os elementos estão presentes na página do profile e se é redirecionado à página de login', () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);
    const email = screen.getByTestId(emailTest);
    const pass = screen.getByTestId(passTest);
    const enter = screen.getByTestId(loginTest);
    userEvent.type(email, 'testeb@trybe.com');
    userEvent.type(pass, '123456789');
    userEvent.click(enter);

    const Btns = screen.getAllByRole('button');
    userEvent.click(Btns[0]);

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    expect(logoutBtn).toBeVisible();
    userEvent.click(logoutBtn);

    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', { name: /enter/i });
    expect(emailInput).toBeVisible();
    expect(passInput).toBeVisible();
    expect(enterBtn).toBeVisible();

    screen.logTestingPlaygroundURL();
  });
});
