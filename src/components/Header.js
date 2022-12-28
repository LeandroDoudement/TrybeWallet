import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trybeWallet from '../images/trybeWallet.png';
import '../styles/Header.css';

class Header extends Component {
  totalSum = () => {
    const { expenses } = this.props;
    const sum = expenses.reduce((acc, curr) => {
      acc += curr.value * curr.exchangeRates[curr.currency].ask;
      return acc;
    }, 0);
    return parseFloat(sum).toFixed(2);
  };

  render() {
    const { email } = this.props;
    const totalExpenses = this.totalSum();
    return (
      <header>
        <img src={ trybeWallet } alt="trybeWallet logo" width="250px" />
        <span
          data-testid="total-field"
          className="total-expenses"
        >
          {totalExpenses
            ? `Total de despesas: ${totalExpenses} BRL` : 'Total de despesas: 0'}

        </span>
        <span data-testid="email-field" className="email">{email}</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
