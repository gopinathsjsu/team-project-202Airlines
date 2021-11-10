import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function BookFlight() {
  const history = useHistory();

  const defaultValues = {
    book_with: 'Money',
    flying_from: '',
    flying_to: '',
    flight_date: '',
    travellers: '',
    flight_class: '',
  };

  const [flightDetails, setFlightDetails] = useState(defaultValues);

  const getFlight = (event) => {
    history.push(`/flightList/${encodeURIComponent(JSON.stringify(flightDetails))}`);
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
          <input type="radio" className="btn" value="Money" name="bookwith" checked="checked" />
          <span>Money</span>
          <input type="radio" className="btn" value="Miles" name="bookwith" />
          <span>Miles</span>
        </div>

        <div className="booking-form">
          <label> Flying From </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Airport Code"
            onChange={(e) => {
              setFlightDetails({ ...flightDetails, flying_from: e.target.value });
            }}
          />

          <label> Flying To </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Airport Code"
            onChange={(e) => {
              setFlightDetails({ ...flightDetails, flying_to: e.target.value });
            }}
          />

          <div className="input-grp">
            <label> Departing </label>
            <input
              type="date"
              className="form-control select-date"
              onChange={(e) => {
                setFlightDetails({ ...flightDetails, flight_date: e.target.value });
              }}
            />
          </div>

          <div className="input-grp">
            <label> Travellers </label>
            <input
              type="number"
              className="form-control"
              min="1"
              step="1"
              onChange={(e) => {
                setFlightDetails({ ...flightDetails, travellers: e.target.value });
              }}
            />
          </div>

          <div className="input-grp">
            <label> Class </label>
            <select
              className="custom-select"
              onChange={(e) => {
                setFlightDetails({ ...flightDetails, class: e.target.value });
              }}
            >
              <option value="1">Economy</option>
              <option value="2">Business</option>
            </select>
          </div>

          <div className="input-grp">
            <button type="button" className="btn btn-primary flight" onClick={getFlight}>
              Show Flights
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
