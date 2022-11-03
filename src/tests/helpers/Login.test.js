import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testes do componente Login', () => {
  const emailDataTestId = 'email-input';
  const passwordDataTestId = 'password-input';
  it('Testa se existe um input com o data-testid="email-input"', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailDataTestId);
    expect(emailInput).toBeInTheDocument();
  });
  it('Testa se existe um input com o data-testid="password-input"', () => {
    renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByTestId(passwordDataTestId);
    expect(passwordInput).toBeInTheDocument();
  });
  it('Teste se existe um botão com o texto entrar', () => {
    renderWithRouterAndRedux(<App />);
    const entrarButton = screen.getByRole('button', { name: 'Entrar' });
    expect(entrarButton).toBeInTheDocument();
  });
  it('Testa se quando renderizado o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const entrarButton = screen.getByRole('button', { name: 'Entrar' });
    expect(entrarButton).toBeDisabled();
  });
  it('Testa se quando digitar email e/ou senha não validos, o botão continua desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailDataTestId);
    userEvent.type(emailInput, 'teste');
    const passwordInput = screen.getByTestId(passwordDataTestId);
    userEvent.type(passwordInput, '1234');
    const entrarButton = screen.getByRole('button', { name: 'Entrar' });
    expect(entrarButton).toBeDisabled();
  });
  it('Checa se o botão é habilitado quando um email e senha validos são digitados', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailDataTestId);
    userEvent.type(emailInput, 'alguem@gmail.com');
    const passwordInput = screen.getByTestId(passwordDataTestId);
    userEvent.type(passwordInput, '123456');
    const entrarButton = screen.getByRole('button', { name: 'Entrar' });
    expect(entrarButton).not.toBeDisabled();
  });
});
