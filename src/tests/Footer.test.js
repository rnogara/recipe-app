import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/RenderWithRouter';
import { AppProvider } from '../context/AppProvider';
import Recipes from '../pages/Recipes';
import App from '../App';

describe('Testa o componente Footer', () => {
  it('Testa se todos os elementos do footer estão presentes', () => {
    renderWithRouter(<AppProvider><Recipes title="Meals" /></AppProvider>);

    const mealIcon = screen.getByTestId('meals-bottom-btn');
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');

    expect(mealIcon).toBeVisible();
    expect(drinkIcon).toBeVisible();
  });
  it('Testa se está redirecionando para a rota de Drinks corretamente', async () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);
    const email = screen.getByTestId('email-input');
    const pass = screen.getByTestId('password-input');
    const enter = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'teste@trybe.com');
    userEvent.type(pass, '123456789');
    userEvent.click(enter);
    await waitFor(async () => {
      const drinkIcon = screen.getAllByRole('button');
      userEvent.click(drinkIcon[drinkIcon.length - 1]);
    });
    const teste = screen.getByRole('heading', { name: /drink/i });
    expect(teste).toBeVisible();
    screen.logTestingPlaygroundURL();
  });
  it('Testa se está redirecionando para a rota de Meals corretamente', async () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);
    const email = screen.getByTestId('email-input');
    const pass = screen.getByTestId('password-input');
    const enter = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'teste@trybe.com');
    userEvent.type(pass, '123456789');
    userEvent.click(enter);
    await waitFor(async () => {
      const mealsIcon = screen.getAllByRole('button');
      userEvent.click(mealsIcon[mealsIcon.length - 2]);
    });
    const teste = screen.getByRole('heading', { name: /meal/i });
    expect(teste).toBeVisible();
    screen.logTestingPlaygroundURL();
  });
});
