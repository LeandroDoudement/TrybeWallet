import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
        <p data-testid="email-field">{email}</p>
        <p
          data-testid="total-field"
        >
          {totalExpenses ? `${totalExpenses}` : ''}

        </p>
        <p data-testid="header-currency-field">BRL</p>
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
