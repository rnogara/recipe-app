// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from './helper/RenderWithRouter';
// import { AppProvider } from '../context/AppProvider';

// const searchTestId = 'search-top-btn';

// describe('Testa o componente Header', () => {
//   it('Testa se os elementos renderizam', () => {
//     renderWithRouter(<AppProvider><MainContent /></AppProvider>);

//     const profileIcon = screen.getByTestId('profile-top-btn');
//     const searchIcon = screen.getByTestId(searchTestId);
//     const pageTitle = screen.getByTestId('page-title');

//     expect(profileIcon).toBeInTheDocument();
//     expect(searchIcon).toBeInTheDocument();
//     expect(pageTitle).toBeInTheDocument();
//   });
//   it('Testa se o botão search aparece na rota Meals e Drinks', async () => {
//     const { history } = renderWithRouter(<AppProvider><MainContent /></AppProvider>);

//     const searchIcon = screen.getByTestId(searchTestId);
//     expect(searchIcon).toBeInTheDocument();

//     history.push('/drinks');

//     const drinksTitle = await screen.findByText('Drinks');
//     expect(drinksTitle).toBeInTheDocument();

//     const searchIcon2 = screen.getByTestId(searchTestId);
//     expect(searchIcon2).toBeInTheDocument();
//   });
//   it('Testa se o botão search ao clicar aparece a searchbar', async () => {
//     renderWithRouter(<AppProvider><MainContent /></AppProvider>);

//     const searchIcon = screen.getByTestId(searchTestId);
//     userEvent.click(searchIcon);

//     const searchBtn = await screen.findByRole('button', { name: 'Search' });
//     expect(searchBtn).toBeInTheDocument();
//   });
//   it('Testa se o botão search não aparece nas outras rotas', () => {
//     const { history } = renderWithRouter(<AppProvider><MainContent /></AppProvider>);

//     const searchIcon = screen.getByTestId(searchTestId);

//     history.push('/meals/:id/in-progress');
//     expect(searchIcon).not.toBeInTheDocument();

//     history.push('/drinks/:id/in-progress');
//     expect(searchIcon).not.toBeInTheDocument();

//     history.push('/drinks/:id');
//     expect(searchIcon).not.toBeInTheDocument();

//     history.push('/meals/:id');
//     expect(searchIcon).not.toBeInTheDocument();

//     history.push('/done-recipes');
//     expect(searchIcon).not.toBeInTheDocument();

//     history.push('/favorite-recipes');
//     expect(searchIcon).not.toBeInTheDocument();

//     history.push('/profile');
//     expect(searchIcon).not.toBeInTheDocument();

//     history.push('/');
//     expect(searchIcon).not.toBeInTheDocument();
//   });
//   it('Testa se o botão profile vai para a rota /profile', async () => {
//     renderWithRouter(<AppProvider><MainContent /></AppProvider>);

//     const profileIcon = screen.getByTestId('profile-top-btn');
//     userEvent.click(profileIcon);

//     const profileTitle = await screen.findByText('Profile');
//     expect(profileTitle).toBeInTheDocument();
//   });
// });
