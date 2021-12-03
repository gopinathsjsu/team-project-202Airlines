import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Divider } from "@material-ui/core";
import "../css/Checkout.css";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearBooking, updateBooking } from "../reducers/actions";
import { REDUCER } from "../utils/consts";
import { get } from "../utils/serverCall";
import { post } from '../utils/serverCall';

export default function Payment() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [redirectHomePage, setRedirectHomePage] = useState(false);
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const [total_money, settotalmoney] = useState(0);
  const [total_miles, settotalmiles] = useState(0);
  const bookingState = useSelector((state) => state.bookingReducer);
  const [userMiles, setUserMiles] = useState(0);

  const getMiles = () => {
    get(`/mileage`).then((res) => {
      setUserMiles(res[0].total_miles);
    });
  };

  useEffect(() => {
    getMiles();
    if (bookingState.book_with === "Money") {
      settotalmoney(
        parseFloat(bookingState.seatsPrice) +
          parseFloat(bookingState.price) +
          parseFloat(0.0)
      );
    } else if (bookingState.isUpdateMode === 0) {
      settotalmiles(
        Number(bookingState.miles) + Number(bookingState.seatsPrice)
      );
    } else {
      settotalmiles(
        Number(bookingState.miles) +
          Number(bookingState.seatsPrice) -
          Number(bookingState.booked_miles)
      );
    }
  }, []);

  useEffect(() => {
    if (bookingState.seats.length === 0) {
      setRedirectHomePage(true);
    }
  }, [bookingState]);

  const createBooking = (booking) => {
    post(`/createBooking`, booking)
      .then((response) => {
        dispatch(clearBooking());
      })
      .catch((error) => {});
  };

  const confirmBooking = () => {
    let booking;
    if (bookingState.book_with === "Money") {
      booking = {
        ...bookingState,
        finalmoney: total_money,
        finalmiles: total_miles,
      };
      createBooking(booking);
      if (bookingState.isUpdateMode === 1) {
        if (total_money < Number(bookingState.booked_money)) {
          alert(`Refund will be processed and updated within a week!!`);
        }
      } else {
        alert(
          `Booked successfully!!! \nAn email has been sent to your account`
        );
      }
      history.push("/myTrips");
    } else if (bookingState.book_with === "Miles") {
      if (userMiles < bookingState.total_miles || bookingState.total_miles === 0) {
        alert("You do not have sufficient miles to book the flight");
        history.push("/home");
      } else {
        booking = {
          ...bookingState,
          finalmoney: total_money,
          finalmiles: total_miles,
        };
        createBooking(booking);
        alert(
          `Booked successfully!!! \nAn email has been sent to your account`
        );
        history.push("/myTrips");
      }
    }
    // createBooking(booking);

    // alert(`Booked successfully!!! \nAn email has been sent to your account`);
    // history.push('/myTrips');
  };

  const returnToSignIn = () => {
    history.push("/signin");
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
        {bookingState.book_with === "Money" ? (
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
                  <input
                    type="password"
                    className="input"
                    data-mask="000"
                    placeholder="000"
                  />
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
              Please complete your payment. For your security, we use standard
              SSL encryption to protect the transfer of your payment
              information.
            </div>
            <Divider variant="fullWidth" className="payment__item divider" />
            <div className="payment__item payment__bill__container">
              <div className="payment__item bill__item">
                <div className="item__name">Ticket Price</div>
                {bookingState.book_with === "Money" ? (
                  <div className="item__price">${bookingState.price}</div>
                ) : (
                  <div className="item__price">{bookingState.miles} Miles</div>
                )}
              </div>
              <div className="payment__item bill__item">
                <div className="item__name">Seat Price</div>
                {bookingState.book_with === "Money" ? (
                  <div className="item__price">${bookingState.seatsPrice}</div>
                ) : (
                  <div className="item__price">
                    {bookingState.seatsPrice} Miles
                  </div>
                )}
              </div>
              <div className="payment__item bill__item">
                <div className="item__name">Taxes and fees</div>
                {bookingState.book_with === "Money" ? (
                  <div className="item__price">$0.00</div>
                ) : (
                  <div className="item__price">0 Miles</div>
                )}
              </div>
              {bookingState.isUpdateMode === 1 ? (
                <div className="payment__item bill__item">
                  <div className="item__name">Refund</div>
                  {bookingState.book_with === "Money" ? (
                    <div className="item__price">
                      -${bookingState.booked_money}
                    </div>
                  ) : (
                    <div className="item__price">
                      {" "}
                      - {bookingState.booked_miles} Miles
                    </div>
                  )}
                </div>
              ) : (
                " "
              )}
            </div>
            <Divider variant="fullWidth" className="payment__item divider" />
            <div className="payment__order__instructions__container">
              <Divider variant="fullWidth" className="payment__item divider" />
            </div>

            <div className="payment__item total__container">
              <div className="total__title">Total</div>
              {bookingState.book_with === "Money" ? (
                <div>
                  {bookingState.isUpdateMode === 1 ? (
                    <div className="total__price">
                      ${" "}
                      {bookingState.seatsPrice +
                        bookingState.price -
                        bookingState.booked_money}
                    </div>
                  ) : (
                    <div className="total__price">$ {total_money}</div>
                  )}
                </div>
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
