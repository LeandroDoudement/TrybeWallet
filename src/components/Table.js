import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element, id) => (
            <tr key={ id }>
              <td key={ element.description }>{element.description}</td>
              <td key={ element.tag }>{element.tag}</td>
              <td key={ element.method }>{element.method}</td>
              <td key={ element.value }>{parseFloat(element.value).toFixed(2) }</td>
              <td
                key={ element.exchangeRates[element.currency].name }
              >
                {element.exchangeRates[element.currency].name}
              </td>
              <td
                key={ element.exchangeRates[element.currency].ask }
              >
                { parseFloat(element.exchangeRates[element.currency].ask).toFixed(2) }
              </td>
              <td
                key={ element.value * id }
              >
                {
                  parseFloat(element.value
                      * element.exchangeRates[element.currency].ask)
                    .toFixed(2)
                }
              </td>
              <td key={ element.currency }>Real</td>
              <td
                key="delete-btn"
              >
                <button
                  type="button"
                  data-testid="delete-btn"
                >
                  Excluir despesa

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
