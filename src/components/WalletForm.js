import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  fetchCurrencies = async () => {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(url);
    const response = await request.json();
    delete response.USDT;
    return response;
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const exchangeRates = await this.fetchCurrencies();
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(setExpenses(expenses));
    this.setState({
      value: '',
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies, isFetching } = this.props;
    const { value,
      currency,
      description,
      method,
      tag } = this.state;
    if (isFetching) {
      return <p>Loading...</p>;
    }
    return (
      <form action="">
        <label htmlFor="valueInput">
          Valor:
          <input
            type="text"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ (event) => this.handleChange(event) }
            id="valueInput"
          />
        </label>
        <label htmlFor="currencySelection">
          Moeda:
          <select
            name="currency"
            id="currencySelection"
            data-testid="currency-input"
            value={ currency }
            onChange={ (event) => this.handleChange(event) }
          >
            {currencies.map((coin) => (
              <option
                key={ coin }
                value={ coin }
              >
                {coin}

              </option>
            ))}
          </select>
        </label>
        <label htmlFor="descriptionInput">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ (event) => this.handleChange(event) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tagInput">
          Categoria de despesa:
          <select
            name="tag"
            id="tagInput"
            data-testid="tag-input"
            value={ tag }
            onChange={ (event) => this.handleChange(event) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa

        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape).isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps)(WalletForm);
