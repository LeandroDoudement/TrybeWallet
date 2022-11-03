import { REQUEST_CURRENCIES_STARTED, RECEIVE_CURRENCIES, SET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES_STARTED:
    return ({
      ...state,
      isFetching: true,
    });
  case RECEIVE_CURRENCIES:
    return ({
      ...state,
      isFetching: false,
      currencies: action.currencies,
    });
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        {
          value: action.expenses.value,
          currency: action.expenses.currency,
          method: action.expenses.method,
          tag: action.expenses.tag,
          description: action.expenses.description,
          id: state.expenses.length,
          exchangeRates: action.expenses.exchangeRates,
        }],
    };
  default: return state;
  }
};

export default wallet;
