import { REQUEST_CURRENCIES_STARTED, RECEIVE_CURRENCIES } from '../actions';

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
  default: return state;
  }
};

export default wallet;
