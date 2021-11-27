import { ACTION } from '../utils/consts';

const initialState = {
  book_with: '',
  end_time: '',
  flight_class: '',
  flight_date: '',
  flight_id: '',
  flight_number: '',
  flying_from: '',
  flying_to: '',
  miles: '',
  price: '',
  start_time: '',
  travelerInfo: [],
  travellers: '',
  seats: [],
  seatsPrice: '',
  isUpdateMode: 0, // 0: new booking, 1: update mode
  total_money: '',
  total_miles: '',
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.BOOKING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;
