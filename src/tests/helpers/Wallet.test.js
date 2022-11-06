import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import WalletForm from '../../components/WalletForm';
import Wallet from '../../pages/Wallet';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testes do componente Wallet', () => {
  const emailDataTestId = 'email-input';
  const passwordDataTestId = 'password-input';
  const valueDataTestId = 'value-input';
  const descriptionDataTestId = 'description-input';
  const ADICIONAR_DESPESA = 'Adicionar despesa';
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
    const valueInput = screen.getByTestId(valueDataTestId);
    expect(valueInput).toBeInTheDocument();
  });
  it('Deve existir um campo para adicionar a descrição da despesa', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const descriptionInput = screen.getByTestId(descriptionDataTestId);
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
    const addExpenseButton = screen.getByRole('button', { name: ADICIONAR_DESPESA });
    expect(addExpenseButton).toBeInTheDocument();
  });
  it('Teste se é possivel modificar os componentes', async () => {
    renderWithRouterAndRedux(<WalletForm />);
    const descriptionInput = screen.getByTestId(descriptionDataTestId);
    userEvent.type(descriptionInput, 'teste123');
    const valueInput = screen.getByTestId(valueDataTestId);
    userEvent.type(valueInput, '123');
    const methodInput = screen.getByTestId('method-input');
    userEvent.selectOptions(methodInput, ['Cartão de crédito']);
    const tagInput = screen.getByTestId('tag-input');
    userEvent.selectOptions(tagInput, ['Lazer']);
    expect(descriptionInput.value).toBe('teste123');
    expect(valueInput.value).toBe('123');
    expect(screen.getByRole('option', { name: 'Cartão de crédito' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Lazer' }).selected).toBe(true);
  });
  it('O valor das despesas totais mudam quando uma despesa é adicionada', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailDataTestId);
    const passwordInput = screen.getByTestId(passwordDataTestId);
    const enterButton = screen.getByRole('button');

    userEvent.type(emailInput, 'trybe@gmail.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(enterButton);

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeInTheDocument();
    expect(totalField.innerHTML).toBe('0.00');

    const valueInput = await screen.findByTestId(valueDataTestId);
    userEvent.type(valueInput, '123');
    const addExpenseButton = screen.getByRole('button', { name: ADICIONAR_DESPESA });
    userEvent.click(addExpenseButton);
    await waitFor(() => expect(totalField.innerHTML).not.toBe('0.00'));
  });
  it('Os valores retornam ao estado inicial ao clicar em Adicionar despesa', async () => {
    renderWithRouterAndRedux(<WalletForm />);

    const valueInput = screen.getByTestId(valueDataTestId);
    expect(valueInput.value).toBe('');
    userEvent.type(valueInput, '123');
    expect(valueInput.value).toBe('123');
    const descriptionInput = screen.getByTestId(descriptionDataTestId);
    expect(descriptionInput.value).toBe('');
    userEvent.type(descriptionInput, 'teste');
    expect(descriptionInput.value).toBe('teste');
    const addExpenseButton = screen.getByRole('button', { name: ADICIONAR_DESPESA });
    userEvent.click(addExpenseButton);
    await waitFor(() => expect(valueInput.value).toBe(''));
    await waitFor(() => expect(descriptionInput.value).toBe(''));
  });
  it('Deve ser possivel deletar uma despesa', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailDataTestId);
    const passwordInput = screen.getByTestId(passwordDataTestId);
    const enterButton = screen.getByRole('button');

    userEvent.type(emailInput, 'trybe@gmail.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(enterButton);

    const addExpenseButton = await screen.findByRole('button', { name: ADICIONAR_DESPESA });
    userEvent.click(addExpenseButton);
    const deleteExpenseButton = await screen.findByRole('button', { name: 'Excluir despesa' });
    userEvent.click(deleteExpenseButton);
    expect(deleteExpenseButton).not.toBeInTheDocument();
  });
});
