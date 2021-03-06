import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Nav, Row } from 'react-bootstrap';
import { useParams, useHistory, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { get } from '../utils/serverCall';
import { BOOKING } from '../utils/consts';
import { updateBooking } from '../reducers/actions';

// TODO : disable next button if all seats are not selected
// TODO : display cost on screen

function SeatMap() {
  const bookingState = useSelector((state) => state.bookingReducer);

  // const { details } = useParams();
  // if (!details) {
  // return <Redirect to="/home" />;
  // }
  // const flightDetails = JSON.parse(decodeURIComponent(details));
  // const flightDetails = JSON.parse(decodeURIComponent({}));
  // console.log(flightDetails);
  const defaultSeatData = {
    rows: 20,
    cols: 3,
    divisions: 2,
    businessClass: 5,
    base: 50,
    business: 25,
    window: 5,
    aisle: 5,
    last: 5,
  };

  // const seatData = {
  //   base: 50,
  //   business: 25,
  //   window: 5,
  //   aisle: 5,
  //   last: 5,
  // };

  const dispatch = useDispatch();

  const [seatData, setSeatData] = useState(defaultSeatData);

  const [bookedSeats, setBookedSeats] = useState([]);
  const [next, setNext] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [redirectNextPage, setRedirectNextPage] = useState(false);
  const [redirectHomePage, setRedirectHomePage] = useState(false);

  useEffect(() => {
    // if (localStorage.getItem(BOOKING.SEATS)) {
    //   setSelectedSeats(JSON.parse(localStorage.getItem(BOOKING.SEATS)));
    // }
    get('/getSeatInfo', { flight_id: bookingState.flight_id }).then((res) => {
      // console.log(res);
      setSeatData(res.seatInfo[0]);
      const booked = res.bookedSeats.map((each) => each.seatId);
      setBookedSeats(booked);
    });
  }, []);

  useEffect(() => {
    setSelectedSeats(bookingState.seats);
    // console.log(bookingState);
    if (bookingState.flight_id === '') {
      setRedirectHomePage(true);
    }
  }, [bookingState]);

  const noOfTravellers = bookingState.travellers;

  const seatClickHandler = (e) => {
    const seatId = e.currentTarget.getAttribute('seatid');
    setSelectedSeats((prev) => {
      if (prev.indexOf(seatId) > -1) {
        const temp = [...prev];
        temp.splice(temp.indexOf(seatId), 1);
        // localStorage.setItem(BOOKING.SEATS, JSON.stringify([...temp]));
        return [...temp];
      }
      if (prev.length >= noOfTravellers) {
        const temp = [...prev];
        temp.shift();
        // localStorage.setItem(BOOKING.SEATS, JSON.stringify([...temp, seatId]));
        return [...temp, seatId];
      }
      // localStorage.setItem(BOOKING.SEATS, JSON.stringify([...prev, seatId]));
      return [...prev, seatId];
    });
    // console.log(e.currentTarget.getAttribute("seatid"));
  };

  useEffect(() => {
    // localStorage.setItem(BOOKING.SEATS, JSON.stringify(selectedSeats));
    if (parseInt(noOfTravellers, 10) === selectedSeats.length) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [selectedSeats]);

  const isBookable = (row) => {
    if (bookingState.flight_class === 'Economy') {
      if (row < seatData.businessClass) {
        return false;
      }
      return true;
    }
    if (row < seatData.businessClass) {
      return true;
    }
    return false;
  };

  const setClickHandler = (id, row) => {
    if (!isBookable(row)) {
      return null;
    }
    if (bookedSeats.indexOf(id) > -1) {
      return null;
    }
    return seatClickHandler;
  };

  // const setSeatStyle = (id) => {
  //   let style = { display: "flex", minWidth: "32px", position: "relative" };
  //   if (bookedSeats.indexOf(id) < 0) {
  //     style = { ...style, cursor: "pointer" };
  //   }
  //   if (selectedSeats.indexOf(id) > -1) {
  //     style = { ...style, color: "green" };
  //   }
  //   return style;
  // };

  const setSeatStyle = (id, row) => {
    let style = { color: 'deepskyblue' };
    if (row < seatData.businessClass) {
      style = { ...style, color: 'orange' };
    }
    if (bookedSeats.indexOf(id) > -1) {
      style = { ...style, color: 'red' };
    }

    if (selectedSeats.indexOf(id) > -1) {
      style = { ...style, color: 'green' };
    }
    return style;
  };

  const setSeatClass = (id, row) => {
    let className = 'seatIcon seatBase';
    if (bookedSeats.indexOf(id) < 0 && isBookable(row)) {
      className += ' seatCursor';
    }
    return className;
  };

  const generateSeatPrice = (row, column, division) => {
    let price = seatData.base;
    if (row < seatData.businessClass) {
      price += seatData.business;
    }
    if (row > seatData.rows * 0.8) {
      price -= seatData.last;
    }
    if (column === 0) {
      price += seatData.aisle;
      if (division === 0) {
        price += seatData.window;
      }
    }
    if ((column + 1) % seatData.cols === 0) {
      price += seatData.aisle;
      if ((division + 1) % seatData.divisions === 0) {
        price += seatData.window;
      }
    }
    return price;
  };

  const getSeatPrice = (seatId) => {
    let row = seatId.substring(0, seatId.length - 1);
    row = parseInt(row, 10) - 1;
    let char = seatId.substring(seatId.length - 1, seatId.length);
    char = char.charCodeAt(0) - 64 - 1;
    const division = Math.floor(char / seatData.cols);
    const column = char % seatData.cols;
    return generateSeatPrice(row, column, division);
  };

  const totalCost = () => {
    let cost = 0;
    selectedSeats.forEach((each) => {
      cost += getSeatPrice(each);
    });
    return cost;
  };

  const nextPage = (e) => {
    dispatch(updateBooking({ seats: selectedSeats, seatsPrice: totalCost() }));
    setRedirectNextPage(true);
  };

  const rows = [];

  const getSeatId = (row, division, col) =>
    row + 1 + String.fromCharCode(division * seatData.cols + col + 1 + 64);

  for (let i = 0; i < seatData.rows; i += 1) {
    const divisions = [];
    for (let j = 0; j < seatData.divisions; j += 1) {
      const columns = [];
      for (let k = 0; k < seatData.cols; k += 1) {
        const id = getSeatId(i, j, k);
        columns.push(
          <div
            seatid={id}
            info={`${id} : $${generateSeatPrice(i, k, j)}`}
            key={id}
            onClick={setClickHandler(id, i)}
            className={setSeatClass(id, i)}
            style={setSeatStyle(id, i)}
            data-toggle="tooltip"
            // title={id}
          >
            <i
              className="material-icons"
              // data-toggle="tooltip"
              // title={id}
              // style={{
              //   color: i < seatData.businessClass ? "orange" : "blue",
              // }}
            >
              event_seat
            </i>
            {/* <p>{id}</p> */}
          </div>
        );
      }
      divisions.push(
        <div className="division" key={j} style={{ marginLeft: '32px', display: 'flex' }}>
          {columns}
        </div>
      );
    }
    rows.push(
      <div
        className="seatRow"
        style={{ display: 'flex', width: 'fit-content', margin: 'auto' }}
        key={i}
      >
        {divisions}
      </div>
    );
  }

  if (redirectNextPage) {
    // return <Navigate to="/signin"> </Navigate>;
    // return <Redirect push="true" to="/bookingSummary" />;
    return <Redirect push to="/paymentGateway" />;
  }
  if (redirectHomePage) {
    return <Redirect push to="/bookFlight" />;
  }

  return (
    <div style={{ width: 'fit-content', margin: 'auto' }}>
      <Typography variant="h3" gutterBottom component="div">
        Select Seat
      </Typography>
      <div>{rows}</div>
      <div style={{ width: 'fit-content', marginLeft: 'auto' }}>
        {/* <Form.Label column>{`Seats Price : $${totalCost()}`}</Form.Label> */}
        <Typography variant="h6" gutterBottom component="div">
          {`Seats Price : $${totalCost()}`}
        </Typography>
      </div>
      <div style={{ width: 'fit-content', marginLeft: 'auto' }}>
        {next && (
          <button type="button" className="btn btn-primary me-auto" onClick={nextPage}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

export default SeatMap;
