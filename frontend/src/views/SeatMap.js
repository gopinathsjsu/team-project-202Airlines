import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

// TODO : disable next button if all seats are not selected
// TODO : display cost on screen

function SeatMap() {
  const defaultSeatData = {
    rows: 20,
    seatsPerDivision: 3,
    divisions: 2,
    businessClass: 5,
  };

  const defaultPrice = {
    base: 50,
    businessClass: 25,
    window: 5,
    aisle: 5,
    last: 5,
  };

  const noOfTravellers = 4;

  const bookedSeats = ['1A', '1E', '10D', '8E'];

  // const [seatStatus, setSeatStatus] = useState([]);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatClickHandler = (e) => {
    const seatId = e.currentTarget.getAttribute('seatid');
    setSelectedSeats((prev) => {
      if (prev.indexOf(seatId) > -1) {
        const temp = [...prev];
        temp.splice(temp.indexOf(seatId), 1);
        return [...temp];
      }
      if (prev.length >= noOfTravellers) {
        const temp = [...prev];
        temp.shift();
        return [...temp, seatId];
      }
      return [...prev, seatId];
    });
    // console.log(e.currentTarget.getAttribute("seatid"));
  };

  const setClickHandler = (id) => {
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
    if (row < defaultSeatData.businessClass) {
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

  const setSeatClass = (id) => {
    let className = 'seatIcon seatBase';
    if (bookedSeats.indexOf(id) < 0) {
      className += ' seatCursor';
    }
    return className;
  };

  const generateSeatPrice = (row, column, division) => {
    let price = defaultPrice.base;
    if (row < defaultSeatData.businessClass) {
      price += defaultPrice.businessClass;
    }
    if (row > defaultSeatData.rows * 0.8) {
      price -= defaultPrice.last;
    }
    if (column === 0) {
      price += defaultPrice.aisle;
      if (division === 0) {
        price += defaultPrice.window;
      }
    }
    if ((column + 1) % defaultSeatData.seatsPerDivision === 0) {
      price += defaultPrice.aisle;
      if ((division + 1) % defaultSeatData.divisions === 0) {
        price += defaultPrice.window;
      }
    }
    return price;
  };

  const getSeatPrice = (seatId) => {
    let row = seatId.substring(0, seatId.length - 1);
    row = parseInt(row, 10) - 1;
    let char = seatId.substring(seatId.length - 1, seatId.length);
    char = char.charCodeAt(0) - 64 - 1;
    const division = Math.floor(char / defaultSeatData.seatsPerDivision);
    const column = char % defaultSeatData.seatsPerDivision;
    return generateSeatPrice(row, column, division);
  };

  const rows = [];
  for (let i = 0; i < defaultSeatData.rows; i += 1) {
    const divisions = [];
    for (let j = 0; j < defaultSeatData.divisions; j += 1) {
      const columns = [];
      for (let k = 0; k < defaultSeatData.seatsPerDivision; k += 1) {
        const id = i + 1 + String.fromCharCode(j * defaultSeatData.seatsPerDivision + k + 1 + 64);
        columns.push(
          <div
            seatid={id}
            info={`${id} : $${generateSeatPrice(i, k, j)}`}
            key={id}
            onClick={setClickHandler(id)}
            className={setSeatClass(id)}
            style={setSeatStyle(id, i)}
            data-toggle="tooltip"
            // title={id}
          >
            <i
              className="material-icons"
              // data-toggle="tooltip"
              // title={id}
              // style={{
              //   color: i < defaultSeatData.businessClass ? "orange" : "blue",
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
      <div className="seatRow" style={{ display: 'flex' }} key={i}>
        {divisions}
      </div>
    );
  }

  const totalCost = () => {
    let cost = 0;
    selectedSeats.forEach((each) => {
      cost += getSeatPrice(each);
    });
    return cost;
  };

  return (
    <>
      <div>{rows}</div>
      <div>{`$${totalCost()}`}</div>
    </>
  );
}

export default SeatMap;
