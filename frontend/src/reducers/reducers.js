import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import errorReducer from './errorReducer';
import bookingReducer from './bookingReducer';

const reducers = combineReducers({ loginReducer, errorReducer, bookingReducer });

export default reducers;
