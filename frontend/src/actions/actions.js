import axios from 'axios';

export const USERS_FETCH_START = 'USERS_FETCH_START';
export const USERS_FETCH_SUCCESS = 'USERS_FETCH_SUCCESS';
export const USERS_FETCH_FAIL = 'USERS_FETCH_FAIL';

export const getPaginatedUsers = skip => dispatch => {
  dispatch({ type: USERS_FETCH_START });
  axios
    .get(`http://localhost:8080/api/users?limit=20&skip=${skip}`)
    .then(res => {
      skip === 0
        ? dispatch({
            type: USERS_FETCH_SUCCESS,
            payload: res.data,
            pageNumber: 1
          })
        : dispatch({
            type: USERS_FETCH_SUCCESS,
            payload: res.data,
            pageNumber: skip / 20 + 1
          });
    })
    .catch(err => dispatch({ type: USERS_FETCH_FAIL, payload: err }));
};