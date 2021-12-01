import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Divider } from '@material-ui/core';
import '../css/Checkout.css';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBooking } from '../reducers/actions';
import { REDUCER } from '../utils/consts';
import backendServer from '../webConfig';

export default function Payment() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [redirectHomePage, setRedirectHomePage] = useState(false);
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const [total_money, settotalmoney] = useState(0);
  const [total_miles, settotalmiles] = useState(0);
  const bookingState = useSelector((state) => state.bookingReducer);

  useEffect(() => {
    if (bookingState.book_with === 'Money') {
      settotalmoney(
        parseFloat(bookingState.seatsPrice) + parseFloat(bookingState.price) + parseFloat(0.0)
      );
    } else {
      settotalmiles(Number(bookingState.miles) + Number(bookingState.seatsPrice));
    }
  }, []);
  useEffect(() => {
    if (bookingState.seats.length === 0) {
      setRedirectHomePage(true);
    }
  }, [bookingState]);

  const createBooking = (booking) => {
    Axios.post(`${backendServer}/createBooking`, booking)
      .then((response) => {})
      .catch((error) => {});
  };
  const confirmBooking = () => {
    let booking;
    if (bookingState.book_with === 'Money') {
      booking = { ...bookingState, finalmoney: total_money, finalmiles: total_miles };
    } else {
      booking = { ...bookingState, finalmoney: total_money, finalmiles: total_miles };
    }
    createBooking(booking);

    alert(`Booked successfully!!! \nAn email has been sent to your account`);
    history.push('/myTrips');
  };
  const returnToSignIn = () => {
    history.push('/signin');
  };

  if (!isSignedIn) {
    returnToSignIn();
  }
  if (redirectHomePage) {
    return <Redirect push="true" to="/bookFlight" />;
  }
  return (
    <div className="wrapper col-6">
      <div className="payment payment-gateway">
        {bookingState.book_with === 'Money' ? (
          <div>
            <div className="payment-logo">
              <p>P</p>
            </div>

            <h2>Payment Gateway</h2>
            <div className="form">
              <div className="card space icon-relative">
                <label className="label">Card holder:</label>
                <input type="text" className="input" placeholder="Name" />
                <i className="fas fa-user" />
              </div>
              <div className="card space icon-relative">
                <label className="label">Card number:</label>
                <input
                  type="text"
                  className="input"
                  data-mask="0000 0000 0000 0000"
                  placeholder="Card Number"
                />
                <i className="far fa-credit-card" />
              </div>
              <div className="card-grp space  pg-1">
                <div className="card-item icon-relative pg-2 pg2-1">
                  <label className="label">Expiry date:</label>
                  <input
                    type="text"
                    name="expiry-data"
                    className="input"
                    data-mask="00 / 00"
                    placeholder="00/00"
                  />
                  <i className="far fa-calendar-alt" />
                </div>
                <div className="card-item icon-relative pg-2">
                  <label className="label">CVC:</label>
                  <input type="text" className="input" data-mask="000" placeholder="000" />
                  <i className="fas fa-lock" />
                </div>
              </div>

              <div className="btn-pg" onClick={confirmBooking}>
                Confirm Booking
              </div>
            </div>
          </div>
        ) : (
          <div className="btn-pg" onClick={confirmBooking}>
            Confirm Booking
          </div>
        )}

        <div className="order__payment__container">
          <div className="order__payment">
            <div className="payment__item place__order__container">
              <div>Payment summary</div>
            </div>
            <div className="payment__item delivery__guideline">
              Please complete your payment. For your security, we use standard SSL encryption to
              protect the transfer of your payment information.
            </div>
            <Divider variant="fullWidth" className="payment__item divider" />
            <div className="payment__item payment__bill__container">
              <div className="payment__item bill__item">
                <div className="item__name">Ticket Price</div>
                {bookingState.book_with === 'Money' ? (
                  <div className="item__price">${bookingState.price}</div>
                ) : (
                  <div className="item__price">{bookingState.miles} Miles</div>
                )}
              </div>
              <div className="payment__item bill__item">
                <div className="item__name">Seat Price</div>
                {bookingState.book_with === 'Money' ? (
                  <div className="item__price">${bookingState.seatsPrice}</div>
                ) : (
                  <div className="item__price">{bookingState.seatsPrice} Miles</div>
                )}
              </div>
              <div className="payment__item bill__item">
                <div className="item__name">Taxes and fees</div>
                {bookingState.book_with === 'Money' ? (
                  <div className="item__price">$0.00</div>
                ) : (
                  <div className="item__price">0 Miles</div>
                )}
              </div>
            </div>
            <Divider variant="fullWidth" className="payment__item divider" />
            <div className="payment__order__instructions__container">
              <Divider variant="fullWidth" className="payment__item divider" />
            </div>

            <div className="payment__item total__container">
              <div className="total__title">Total</div>
              {bookingState.book_with === 'Money' ? (
                <div className="total__price">${total_money}</div>
              ) : (
                <div className="total__price">{total_miles} Miles</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
