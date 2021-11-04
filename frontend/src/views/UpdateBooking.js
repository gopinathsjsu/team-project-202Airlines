import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import backendServer from '../webConfig';

function UpdateBooking() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios.get(`${backendServer}/updateBooking/${id}`).then((response) => {
      setBookingHistory(response.data);
    });
  }, []);
  console.log(bookingHistory);

  return <div />;
}

export default UpdateBooking;
