import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import '../css/App.css';
import '../css/myTrip.css';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import backendServer from '../webConfig';

function MyTrip() {
  const [toggleState, setToggleState] = useState(1);
  const [bookingHistory, setBookingHistory] = useState([]);
  // const [cancelMode, setCancelMode] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    Axios.get(`${backendServer}/getBookingHistory`).then((response) => {
      setBookingHistory(response.data);
    });
  }, []);
  console.log(bookingHistory);

  const cancelBookingFullRefund = (id, prices, miles) => {
    if (prices) {
      alert('Money will be refunded within 5 days');
      const values = {
        booking_id: id,
        total_miles: 0,
      };

      Axios.post(`${backendServer}/cancelFlightBookingRefund`, values)
        .then((result) => {
          console.log(result);
          window.location.reload();
        })
        .catch((error) => {});
    } else {
      const values = {
        booking_id: id,
        total_miles: miles,
      };

      Axios.post(`${backendServer}/cancelFlightBookingRefund`, values)
        .then((result) => {
          console.log(result);
          window.location.reload();
          alert(`${values.total_miles} Miles has been refunded to mileage account`);
        })
        .catch((error) => {});
    }
  };

  const cancelBookingCharges = (id, prices, miles) => {
    if (miles) {
      miles *= 0.8;
      const values = {
        booking_id: id,
        total_miles: miles,
      };
      console.log(values);
      Axios.post(`${backendServer}/cancelFlightBookingCharges`, values)
        .then((result) => {
          // console.log(result);
          window.location.reload();
        })
        .catch((error) => {});
    } else {
      alert('Money after charges will be refunded within 5 days');
    }
  };

  return (
    <div className="flight-book-form">
      <div className="container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
            onClick={() => toggleTab(1)}
          >
            Upcoming
          </button>
          <button
            className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
            onClick={() => toggleTab(2)}
          >
            Past
          </button>
          <button
            className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'}
            onClick={() => toggleTab(3)}
          >
            Canceled
          </button>
        </div>

        <div className="content-tabs">
          <div className={toggleState === 1 ? 'content  active-content' : 'content'}>
            <table id="booking" style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Departure Date</th>
                  <th scope="col">Source</th>
                  <th scope="col">Arrival Date</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Price</th>
                  <th scope="col">Miles</th>
                  <th scope="col">Status</th>
                  <th scope="col">Edit Reservation</th>
                </tr>
                {bookingHistory
                  .filter(
                    (a) =>
                      new Date(a.dep_date) - new Date() > 0 &&
                      !(
                        a.status.toLowerCase() === 'cancelled' ||
                        a.status.toLowerCase() === 'canceled'
                      )
                  )
                  .map((data, index) => (
                    <tr key={data.booking_id}>
                      <th scope="row">{data.booking_id}</th>
                      <td>{data.booking_date}</td>
                      <td>{data.dep_date}</td>
                      <td>{data.src}</td>
                      <td>{data.arr_date}</td>
                      <td>{data.dst}</td>
                      <td>${data.price}</td>
                      <td>{data.milesused}</td>
                      <td>{data.status}</td>
                      <td>
                        <button
                          onClick={() => {
                            window.location = `/updateBooking/${data.booking_id}`;
                          }}
                        >
                          Update Booking
                        </button>
                        <button
                          onClick={() => {
                            const dateOne = moment(`${data.dep_date}`);
                            const dateTwo = moment(`${data.curr_date}`);
                            const result = dateOne.diff(dateTwo, 'days');
                            console.log(result);
                            if (result <= 1) {
                              alert(
                                'Booking cancellation charges apply since cancelling one day before flight departure.'
                              );
                              cancelBookingCharges(data.booking_id, data.price, data.milesused);
                            } else {
                              cancelBookingFullRefund(data.booking_id, data.price, data.milesused);
                            }
                          }}
                        >
                          Cancel Booking
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className={toggleState === 2 ? 'content  active-content' : 'content'}>
            <table id="booking" style={{ width: '100%' }}>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Booking Date</th>
                <th scope="col">Departure Date</th>
                <th scope="col">Source</th>
                <th scope="col">Arrival Date</th>
                <th scope="col">Destination</th>
                <th scope="col">Price</th>
                <th scope="col">Miles</th>
                <th scope="col">Status</th>
              </tr>
              {bookingHistory
                .filter((a) => new Date(a.dep_date) - new Date() < 0)
                .map((data, index) => (
                  <tr key={data.booking_id}>
                    <th scope="row">{data.booking_id}</th>
                    <td>{data.booking_date}</td>
                    <td>{data.dep_date}</td>
                    <td>{data.src}</td>
                    <td>{data.arr_date}</td>
                    <td>{data.dst}</td>
                    <td>${data.price}</td>
                    <td>{data.milesused}</td>
                    <td>{data.status}</td>
                  </tr>
                ))}
            </table>
          </div>
          <div className={toggleState === 3 ? 'content  active-content' : 'content'}>
            <table id="booking" style={{ width: '100%' }}>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Booking Date</th>
                <th scope="col">Departure Date</th>
                <th scope="col">Source</th>
                <th scope="col">Arrival Date</th>
                <th scope="col">Destination</th>
                <th scope="col">Price</th>
                <th scope="col">Miles</th>
                <th scope="col">Status</th>
              </tr>
              {bookingHistory
                .filter(
                  (a) =>
                    a.status.toLowerCase() === 'cancelled' || a.status.toLowerCase() === 'canceled'
                )
                .map((data, index) => (
                  <tr key={data.booking_id}>
                    <th scope="row">{data.booking_id}</th>
                    <td>{data.booking_date}</td>
                    <td>{data.dep_date}</td>
                    <td>{data.src}</td>
                    <td>{data.arr_date}</td>
                    <td>{data.dst}</td>
                    <td>${data.price}</td>
                    <td>{data.milesused}</td>
                    <td>{data.status}</td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTrip;
