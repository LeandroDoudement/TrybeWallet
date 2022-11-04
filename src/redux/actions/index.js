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

export const SET_EXPENSES = 'SET_EXPENSES';

export const setExpenses = (expenses) => ({
  type: SET_EXPENSES,
  expenses: {
    id: expenses.id,
    value: expenses.value,
    description: expenses.description,
    currency: expenses.currency,
    method: expenses.method,
    tag: expenses.tag,
    exchangeRates: expenses.exchangeRates,

  },
});

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});
