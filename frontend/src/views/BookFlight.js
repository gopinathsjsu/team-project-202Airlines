import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateBooking } from '../reducers/actions';

export default function BookFlight() {
  const history = useHistory();

  const defaultValues = {
    book_with: 'Money',
    flying_from: '',
    flying_to: '',
    flight_date: '',
    travellers: '',
    flight_class: 'Economy',
  };
  const dispatch = useDispatch();
  const [flightDetails, setFlightDetails] = useState(defaultValues);

  const getFlight = () => {
    history.push("/flightList");
    dispatch(updateBooking(flightDetails));
  };

  return (
    <form className="flight-book-form">
      <div className="booking-form-box">
        <div
          className="radio-btn"
          onChange={(e) => {
            setFlightDetails({ ...flightDetails, book_with: e.target.value });
          }}
        >
          <input type="radio" className="btn" value="Money" name="bookwith" defaultChecked="checked" />
          <span>Money</span>
          <input type="radio" className="btn" value="Miles" name="bookwith" />
          <span>Miles</span>
        </div>

        <div className="booking-form">
            <label> Flying From </label>
            <input type="text" className="form-control book" placeholder="Enter Airport Code" required
                   onChange={(e) => {
                    setFlightDetails({ ...flightDetails, flying_from: e.target.value });
                   }}/>

            <label> Flying To </label>
            <input type="text" className="form-control book" placeholder="Enter Airport Code" required
                    onChange={(e) => {
                      setFlightDetails({ ...flightDetails, flying_to: e.target.value });
                    }}/>

            <div className="input-grp">
              <label> Departing </label>
              <input type="date" className="form-control book select-date" required
                onChange={(e) => {
                setFlightDetails({ ...flightDetails, flight_date: e.target.value });
              }}
            />
          </div>

            <div className="input-grp">
              <label> Travellers </label>
              <input type="number" className="form-control book" min="1" step="1" required
                onChange={(e) => {
                setFlightDetails({ ...flightDetails, travellers: e.target.value });
              }}
            />
          </div>

          <div className="input-grp">
            <label> Class </label>
            <select
              className="custom-select" required
              onChange={(e) => {
                setFlightDetails({ ...flightDetails, flight_class: e.target.value });
              }}
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="input-grp">
            <button type="submit" className="btn btn-primary flight" onClick={getFlight}>
              Show Flights
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
