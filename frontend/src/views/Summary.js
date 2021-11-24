import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { post } from '../utils/serverCall';

function Summary() {
  const bookingState = useSelector((state) => state.bookingReducer);
  const [redirectNextPage, setRedirectNextPage] = useState(false);
  const [redirectHomePage, setRedirectHomePage] = useState(false);
  console.log(bookingState);

  useEffect(() => {
    if (bookingState.seats.length === 0) {
      setRedirectHomePage(true);
    }
  }, [bookingState]);

  const createBooking = () => {
    // Move this function to payments page.
    post('/createBooking', bookingState)
      .then((response) => {})
      .catch((error) => {});
  };

  const confirmBooking = () => {
    // setRedirectNextPage(true);
    // Move this function to payments page.
    createBooking();
  };

  if (redirectNextPage) {
    // return <Navigate to="/signin"> </Navigate>;
    return <Redirect push="true" to="/paymentGateway" />;
  }
  if (redirectHomePage) {
    return <Redirect push="true" to="/bookFlight" />;
  }
  return (
    <>
      <div>Add Booking Summary here from bookingState variable</div>
      <div>Skipping payment page for now to check booking implementation</div>
      <div>
        <button type="button" className="btn btn-primary me-auto col-sm-2" onClick={confirmBooking}>
          Confirm Booking
        </button>
      </div>
    </>
  );
}

export default Summary;
