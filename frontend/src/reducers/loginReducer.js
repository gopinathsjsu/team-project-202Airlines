import { ACTION, REDUCER } from '../utils/consts';

const initialState = {
  [REDUCER.SIGNEDIN]: false,
  [REDUCER.ISADMIN]: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.CUSTOMER_SIGIN:
      return {
        ...state,
        [REDUCER.SIGNEDIN]: true,
      };
    case ACTION.RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default loginReducer;
