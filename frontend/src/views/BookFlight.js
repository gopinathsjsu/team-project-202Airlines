import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateBooking } from '../reducers/actions';
import { AIRPORTS } from '../utils/consts';

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
  const [alertMessage, setAlertMessage] = useState("");


  const getFlight = (e) => {
    e.preventDefault();

    if(flightDetails.flying_from === flightDetails.flying_to){
      setAlertMessage("Select different from and to airport!");
    } else if(flightDetails.flying_from === "") {
      setAlertMessage("Select From airport!");
    } else if(flightDetails.flying_to === "") {
      setAlertMessage("Select To airport!");
    } else if(flightDetails.flight_date === "") {
      setAlertMessage("Select valid date!");
    } else if(flightDetails.travellers === "") {
      setAlertMessage("Select number of travellers!");
    }else if(flightDetails.flying_from !== "" && flightDetails.flying_to !== "" 
    && flightDetails.flight_date !== "" && flightDetails.travellers !== ""){
      history.push("/flightList");
      dispatch(updateBooking(flightDetails));
    }
  };

  return (
    <form className="flight-book-form">
      {alertMessage && (
        <div className="alert alert-danger" role="alert">
          {alertMessage}
        </div>
      )}
      
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
            <label className="required-field"> Flying From </label>
            <select className="combobox form-control book"
                    onChange={(e) => {
                      setFlightDetails({ ...flightDetails, flying_from: e.target.value });
                    }}>
                <option value="">Enter Airport</option>
                {AIRPORTS.map((data, key)=>{
                    return (<option key={key} value={data.key}>{data.value}</option>)
                })}
            </select>

            <label className="required-field"> Flying To </label>
            <select className="combobox form-control book"
                    onChange={(e) => {
                      setFlightDetails({ ...flightDetails, flying_to: e.target.value });
                    }}>
                <option value="">Enter Airport</option>
                {AIRPORTS.map((data, key)=>{
                    return (<option key={key} value={data.key}>{data.value}</option>)
                })}
            </select>

            <div className="input-grp">
              <label className="required-field"> Departing </label>
              <input type="date" className="form-control book select-date" required
                onChange={(e) => {
                setFlightDetails({ ...flightDetails, flight_date: e.target.value });
              }}
            />
          </div>

            <div className="input-grp">
              <label className="required-field"> Travellers </label>
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
