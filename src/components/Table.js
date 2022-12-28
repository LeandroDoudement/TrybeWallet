import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';
import '../styles/Table.css';

class Table extends Component {
  deleteExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

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
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element) => (
            <tr key={ element.id }>
              <td key={ element.description }>{element.description}</td>
              <td key={ element.tag }>{element.tag}</td>
              <td key={ element.method }>{element.method}</td>
              <td>
                {element.value ? parseFloat(element.value).toFixed(2) : '0.00' }
              </td>
              <td>
                {element.exchangeRates[element.currency].name}
              </td>
              <td>
                { parseFloat(element.exchangeRates[element.currency].ask).toFixed(2) }
              </td>
              <td>
                {parseFloat(element.value * element.exchangeRates[element.currency].ask)
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <FontAwesomeIcon
                  icon={ faX }
                  onClick={ () => this.deleteExpense(element.id) }
                  className="delete-expense"
                />
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
