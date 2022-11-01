export const SET_EMAIL = 'SET_EMAIL';

export const setEmail = (value) => ({
  type: SET_EMAIL,
  payload: {
    email: value,
  },
});

export const REQUEST_CURRENCIES_STARTED = 'REQUEST_CURRENCIES_STARTED';

const requestCurrenciesStarted = () => ({
  type: REQUEST_CURRENCIES_STARTED,
});

export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestCurrenciesStarted());
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(url);
    const response = await request.json();
    delete response.USDT;
    const currencies = Object.keys(response);
    dispatch(receiveCurrencies(currencies));
  } catch (error) {
    console.log(error);
  }
};
