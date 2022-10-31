export const SET_EMAIL = 'SET_EMAIL';

export const setEmail = (value) => ({
  type: SET_EMAIL,
  payload: {
    email: value,
  },
});
