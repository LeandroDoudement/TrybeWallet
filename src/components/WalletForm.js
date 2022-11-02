import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      description: '',
      paymentMethod: 'Dinheiro',
      categoriaDeDespesa: 'Alimentação',
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { dispatch, expenses } = this.props;
    dispatch(setExpenses(expenses));
    this.setState({
      value: 0,
      currency: 'USD',
      description: '',
      paymentMethod: 'Dinheiro',
      categoriaDeDespesa: 'Alimentação',
    });
  };

  render() {
    const { currencies, isFetching } = this.props;
    const { value,
      currency,
      description,
      paymentMethod,
      categoriaDeDespesa } = this.state;
    if (isFetching) {
      return <p>Loading...</p>;
    }
    return (
      <form action="">
        <label htmlFor="valueInput">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <label htmlFor="currencySelection">
          Moeda:
          <select
            name="currency"
            id="currencySelection"
            data-testid="currency-input"
            value={ currency }
            onClick={ (event) => this.handleChange(event) }
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
        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select
            name="paymentMethod"
            id="paymentMethod"
            data-testid="method-input"
            value={ paymentMethod }
            onClick={ (event) => this.handleChange(event) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Crédito">Cartão de crédito</option>
            <option value="Cartão de Débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tagInput">
          Categoria de despesa:
          <select
            name="categoriaDeDespesa"
            id="tagInput"
            data-testid="tag-input"
            value={ categoriaDeDespesa }
            onClick={ (event) => this.handleChange(event) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="submit"
            onClick={ this.handleClick() }
          >
            Adicionar despesa

          </button>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  expenses: {
    value: state.value,
    currency: state.currency,
    description: state.description,
    paymentMethod: state.paymentMethod,
    categoriaDeDespesa: state.categoriaDeDespesa,
  },
});

export default connect(mapStateToProps)(WalletForm);
