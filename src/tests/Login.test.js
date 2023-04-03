import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/RenderWithRouter';
import { AppProvider } from '../context/AppProvider';

const emailId = 'email-input';
const passwordId = 'password-input';
const btnName = 'Enter';
const testEmail = 'teste@teste.com';

describe('Testa página de login', () => {
  it('Testa se todos os elementos estão na página', () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const loginBtn = screen.getByRole('button', { name: btnName });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
  it('Testa se o botão fica habilitado seguindo as regras', () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const loginBtn = screen.getByRole('button', { name: btnName });

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, '01234567');

    expect(loginBtn).toBeEnabled();
  });
  it('Testa se o botão redireciona para a página MainContent', () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const loginBtn = screen.getByRole('button', { name: btnName });

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    const mainTitle = screen.getByRole('heading', {
      name: 'Recipes App',
      level: 3,
    });

    expect(mainTitle).toBeInTheDocument();
  });
  it('Testa se os Inputs mudam o valor conforme digita', () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, '1234567');

    expect(emailInput).toHaveValue(testEmail);
    expect(passwordInput).toHaveValue('1234567');
  });
});
