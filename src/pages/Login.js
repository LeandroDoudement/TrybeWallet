import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmail } from '../redux/actions';
import trybeWallet from '../images/trybeWallet.png';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(setEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordMinimum = 6;
    const submitVerification = (emailRegex.test(email)
    && password.length >= passwordMinimum);
    return (
      <div>
        <div className="white-box">
          <img src={ trybeWallet } alt="TrybeWallet logo" />
          <input
            type="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            name="email"
            placeholder="Email"
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            name="password"
            placeholder="Senha"
          />
          <button
            type="button"
            disabled={ !submitVerification }
            onClick={ this.handleClick }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  globalEmail: state.email,
  globalPassword: state.password,
});

export default connect(mapStateToProps)(Login);
