import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import WalletForm from '../../components/WalletForm';
import Wallet from '../../pages/Wallet';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testes do componente Wallet', () => {
  const emailDataTestId = 'email-input';
  const passwordDataTestId = 'password-input';
  it('Deve existir um componente renderizando o email digitado na pagina login e com data-testid="email-field"', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailDataTestId);
    userEvent.type(emailInput, 'alguem@gmail.com');
    const passwordInput = screen.getByTestId(passwordDataTestId);
    userEvent.type(passwordInput, '123456');
    const entrarButton = screen.getByRole('button', { name: 'Entrar' });
    userEvent.click(entrarButton);
    const emailField = screen.getByTestId('email-field');
    expect(emailField.innerHTML).toBe('alguem@gmail.com');
  });
  it('Deve existir Um elemento com a despesa total gerada pela lista de gastos', () => {
    renderWithRouterAndRedux(<Wallet />);
    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeInTheDocument();
  });
  it('Deve existir Um elemento que mostre qual câmbio está sendo utilizado', () => {
    renderWithRouterAndRedux(<Wallet />);
    const headerCurrencyField = screen.getByTestId('header-currency-field');
    expect(headerCurrencyField).toBeInTheDocument();
  });
  it('Deve existir um campo para adicionar o valor da despesa', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
  });
  it('Deve existir um campo para adicionar a descrição da despesa', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
  });
  it('Deve existir um campo para selecionar a moeda', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();
  });
  it('Deve existir um campo para selecionar o método de pagamento', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
  });
  it('Deve existir um campo para selecionar a categoria de despesa', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
  });
  it('Deve existir um botão para adicionar as despesas', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const addExpenseButton = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(addExpenseButton).toBeInTheDocument();
  });
});
