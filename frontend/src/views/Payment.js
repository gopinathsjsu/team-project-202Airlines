import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Divider } from '@material-ui/core';
import '../css/Checkout.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useLoginValidate from '../components/Validate';
import { updateBooking } from '../reducers/actions';

export default function Payment() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, userData } = useLoginValidate();
  const [total_money, settotalmoney] = useState('');
  const [total_miles, settotalmiles] = useState('');
  const bookingState = useSelector((state) => state.bookingReducer);

  useEffect(async () => {
    if (bookingState.book_with === 'Money') {
      console.log(bookingState);
      settotalmoney(parseFloat(bookingState.seatsPrice) + parseFloat(12.99));
      dispatch(updateBooking({ total_money }));
      console.log(bookingState);
    } else {
      console.log(bookingState);
      settotalmiles(Number(bookingState.miles) + Number(10));
      dispatch(updateBooking({ total_miles }));
      console.log(bookingState);
    }
    console.log(bookingState);
  }, []);
  const pay = () => {
    console.log(userData.email_id);
    alert(
      `Booked successfully!!! \nAn email has been sent to your account '${userData.email_id}''`
    );
    history.push('/myTrips');
  };
  return (
    <div className="wrapper col-6">
      <div className="payment payment-gateway">
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

          <div className="btn-pg" onClick={pay}>
            Pay
          </div>
        </div>
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
                <div className="item__name">Seat Price</div>
                {bookingState.book_with === 'Money' ? (
                  <div className="item__price">${bookingState.seatsPrice}</div>
                ) : (
                  <div className="item__price">{bookingState.miles} Miles</div>
                )}
              </div>
              <div className="payment__item bill__item">
                <div className="item__name">Taxes and fees</div>
                {bookingState.book_with === 'Money' ? (
                  <div className="item__price">$12.99</div>
                ) : (
                  <div className="item__price">10 Miles</div>
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
                <div className="total__price">{bookingState.total_money}</div>
              ) : (
                <div className="total__price">{bookingState.total_miles} Miles</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
