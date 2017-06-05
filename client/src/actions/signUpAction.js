import axios from 'axios';
import actionTypes from './actionTypes';

const signUpStatus = payload => ({
  type: actionTypes.SIGN_UP_STATUS, payload
});

const signUp = details => (dispatch) => {
  axios
  .post('/api/users', details)
  .then((res) => {
    localStorage.setItem('token', res.data.token);
    dispatch(signUpStatus(res.data));
  })
  .catch((error) => {
    dispatch(signUpStatus(error.response.data));
  });
};
export default signUp;
