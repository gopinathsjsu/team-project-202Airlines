import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import backendServer from '../webConfig';

function UpdateBooking() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [flightDetails, setFlightDetails] = useState({});
  // console.log(id);

  useEffect(() => {
    axios.get(`${backendServer}/updateBooking/${id}`).then((response) => {
      setBookingHistory(response.data);
      console.log('data', response.data);
      setFlightDetails({
        flying_from: `${response.data[0].src}`,
        flying_to: `${response.data[0].dst}`,
        flight_date: `${response.data[0].dep_date}`,
        flight_class: 'Economy',
      });
    });
  }, []);

  const getFlight = (event) => {
    history.push(`/flightList/${encodeURIComponent(JSON.stringify(flightDetails))}`);
  };

  return (
    <div>
      <form className="flight-book-form">
        <h4 style={{ color: 'white', marginLeft: '580px', marginTop: '50px' }}>
          Update Booking Search
        </h4>
        <div className="booking-form-box" style={{ marginTop: '-8px' }} />
        <div className="booking-form-box" style={{ marginTop: '40px' }}>
          <div className="booking-form">
            {bookingHistory.map((data, index) => (
              <div>
                <label> Flying From </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={data.src}
                  disabled
                  style={{ background: 'grey' }}
                />
                <label> Flying To </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={data.dst}
                  disabled
                  style={{ background: 'grey' }}
                />
                <div className="input-grp">
                  <label> Departure Date </label>
                  <input
                    type="date"
                    className="form-control select-date"
                    defaultValue={data.dep_date}
                    onChange={(e) => {
                      setFlightDetails({ ...flightDetails, flight_date: e.target.value });
                    }}
                  />
                </div>
                <br />
                <div className="input-grp">
                  <label> Class </label>
                  <br />
                  <select className="custom-select" defaultValue="Business">
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>
            ))}

            <div className="input-grp">
              <button type="button" className="btn btn-primary flight" onClick={getFlight}>
                Search Flights
              </button>
              <br />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateBooking;
