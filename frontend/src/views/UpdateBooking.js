import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import backendServer from '../webConfig';

function UpdateBooking() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [passport, setPassport] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const [flightDetails, setFlightDetails] = useState({});
  const [passData, setPassData] = useState('');
  // console.log(id);

  const bookingList = () => {
    axios.get(`${backendServer}/updateBooking/${id}`).then((response) => {
      setBookingHistory(response.data);
      // console.log('data', response.data);
      setFlightDetails({
        book_with: `${response.data[0].price}` == 0 ? 'Miles' : 'Money',
        flying_from: `${response.data[0].src}`,
        flying_to: `${response.data[0].dst}`,
        flight_date: `${response.data[0].dep_date}`,
      });
    });
  };

  const getPassport = () => {
    axios.get(`${backendServer}/getPassport`).then((response) => {
      setPassport(response.data[0].passportid);
    });
  };

  const updatePassport = () => {
    axios.post(`${backendServer}/updatePassport`, { passportid: passData }).then((result) => {
      console.log(result);
      window.location = '/home';
    });
  };

  const getFlight = (event) => {
    console.log('data for update', flightDetails);
    history.push(`/updateflightList/${encodeURIComponent(JSON.stringify(flightDetails))}`);
  };

  useEffect(() => {
    bookingList();
    getPassport();
  }, []);

  return (
    <div>
      <form className="flight-book-form">
        <h3 style={{ color: 'white', marginLeft: '525px', marginTop: '80px' }}>
          Change Upcoming Reservation
        </h3>
        <div className="booking-form-box" style={{ marginTop: '-8px' }} />
        <Row>
          <Col>
            <div className="booking-form-box" style={{ marginTop: '40px' }}>
              <h3 style={{ marginLeft: '90px', marginTop: '20px' }}>Update Date</h3>
              <div className="booking-form">
                {bookingHistory.map((data, index) => (
                  <div>
                    <label> Flying From </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={data.src}
                      disabled
                      style={{ background: 'grey' }}
                    />
                    <label> Flying To </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={data.dst}
                      disabled
                      style={{ background: 'grey' }}
                    />
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
                ))}
                <br />
                <div className="input-grp" style={{ marginLeft: '70px' }}>
                  <button type="button" className="btn btn-primary flight" onClick={getFlight}>
                    Change Date
                  </button>
                  <br />
                </div>
              </div>
            </div>
          </Col>
          {/* Update Class */}
          <Col>
            <div className="booking-form-box" style={{ marginTop: '40px' }}>
              <h3 style={{ marginLeft: '90px', marginTop: '20px' }}>Update Seat</h3>
              <div className="booking-form">
                {bookingHistory.map((data, index) => (
                  <div>
                    <label> Flying From </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={data.src}
                      disabled
                      style={{ background: 'grey' }}
                    />
                    <label> Flying To </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={data.dst}
                      disabled
                      style={{ background: 'grey' }}
                    />
                    <label> Class </label>
                    <br />
                    <select className="custom-select" defaultValue="Business">
                      <option value="Economy">Economy</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                ))}
                <br />
                <div className="input-grp" style={{ marginLeft: '70px' }}>
                  <button type="button" className="btn btn-primary flight" onClick={getFlight}>
                    Change Seat
                  </button>
                  <br />
                </div>
              </div>
            </div>
          </Col>
          {/* Add Traveller */}
          <Col>
            <div className="booking-form-box" style={{ marginTop: '40px' }}>
              <h3 style={{ marginLeft: '80px', marginTop: '20px' }}>Update Passport</h3>
              <div className="booking-form">
                {bookingHistory.map((data, index) => (
                  <div>
                    <label> Flying From </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={data.src}
                      disabled
                      style={{ background: 'grey' }}
                    />
                    <label> Flying To </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={data.dst}
                      disabled
                      style={{ background: 'grey' }}
                    />
                    <label> Passport Number </label>
                    <input
                      type="text"
                      className="form-control select-date"
                      defaultValue={passport}
                      onChange={(e) => {
                        setPassData(e.target.value);
                      }}
                    />
                  </div>
                ))}
                <br />
                <div className="input-grp" style={{ marginLeft: '70px' }}>
                  <button
                    type="button"
                    className="btn btn-primary flight"
                    onClick={() => {
                      updatePassport();
                    }}
                  >
                    Change Detail
                  </button>
                  <br />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default UpdateBooking;
