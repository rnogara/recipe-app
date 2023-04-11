import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helper/RenderWithRouter';
import { AppProvider } from '../context/AppProvider';
import mockMealId from './helper/mockMealId';
import mockDrinkId from './helper/mockDrinkId';
import App from '../App';

describe('00. Testando a tela de receitas em progresso', () => {
  it('01. Testa se botões de favoritar e compartilhar estão na tela (Rota /meals)', async () => {
    global.fetch = jest.fn(mockMealId);
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    history.push('/meals/52977/in-progress');
    await waitFor(() => screen.getByRole('heading', { level: 1, name: 'Corba' }));
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getAllByRole('button')[1];
    expect(shareBtn).toBeInTheDocument();
    expect(shareBtn).toBeVisible();
    expect(favoriteBtn).toBeInTheDocument();
    expect(shareBtn).toBeVisible();
  });
  it('02. Testa se botões de favoritar e compartilhar estão na tela (Rota /drinks)', async () => {
    global.fetch = jest.fn(mockDrinkId);
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    history.push('/drinks/15997/in-progress');
    await waitFor(() => screen.getByRole('heading', { level: 1, name: 'GG' }));
    screen.logTestingPlaygroundURL();
    const recipeTitle = screen.getByRole('heading', { level: 1, name: 'GG' });
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toBeDefined();
    const recipePhoto = screen.getByAltText('drinks recipe');
    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto).toBeDefined();
  });
});
