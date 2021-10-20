import Axios from 'axios';
import { SERVER } from './consts';

Axios.defaults.withCredentials = true;

const get = (path, data) =>
  Axios.get(SERVER.URL + path, { params: data })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.err) {
        throw error.response.data.err;
      } else {
        throw 'Some Server Side Error Occured';
      }
    });

const post = (path, data) =>
  Axios.post(SERVER.URL + path, data, { mode: 'cors' })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.err) {
        throw error.response.data.err;
      } else {
        throw 'server side error';
      }
    });

export { get, post };
