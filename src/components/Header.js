import React, { Component } from 'react';
import store from '../redux/store';

class Header extends Component {
  render() {
    const state = store.getState();
    const { email } = state.user;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">Despesa total: 0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

export default Header;
