import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { currencies, isFetching } = this.props;
    if (isFetching) {
      return <p>Loading...</p>;
    }
    return (
      <form action="">
        <label htmlFor="valueInput">
          Valor:
          <input type="number" data-testid="value-input" />
        </label>
        <label htmlFor="currencySelection">
          Moeda:
          <select name="currencies" id="currencySelection" data-testid="currency-input">
            {currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
              >
                {currency}

              </option>
            ))}
          </select>
        </label>
        <label htmlFor="descriptionInput">
          Descrição
          <input type="text" data-testid="description-input" />
        </label>
        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select name="payment-method" id="paymentMethod" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao-de-credito">Cartão de crédito</option>
            <option value="cartao-de-debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tagInput">
          Categoria de despesa:
          <select name="tagInput" id="tagInput" data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
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
});

export default connect(mapStateToProps)(WalletForm);
