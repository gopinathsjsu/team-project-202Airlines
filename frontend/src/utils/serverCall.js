import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../reducers/actionCreators';
import { showError } from '../reducers/actions';
import store from '../reducers/store';
import { SERVER } from './consts';

Axios.defaults.withCredentials = true;

// const dispatch = useDispatch();
// const { showError } = bindActionCreators(actionCreators, dispatch);

const get = (path, data) =>
  // console.log('');
  Axios.get(SERVER.URL + path, { params: data })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.data.err) {
        store.dispatch(showError(error.response.data.err));
        throw error.response.data.err;
      } else {
        store.dispatch(showError('Server Side Error Occured'));
        throw 'Server Side Error Occured';
      }
    });
const post = (path, data) =>
  // console.log('');
  Axios.post(SERVER.URL + path, data, { mode: 'cors' })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.data.err) {
        store.dispatch(showError(error.response.data.err));
        throw error.response.data.err;
      } else {
        store.dispatch(showError('Server Side Error Occured'));
        throw 'Server Side Error Occured';
      }
    });
export { get, post };
