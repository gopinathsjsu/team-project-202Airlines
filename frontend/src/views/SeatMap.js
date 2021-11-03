import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function SeatMap() {
  const defaultSeatData = {
    rows: 20,
    seatsPerDivision: 3,
    divisions: 2,
    businessClass: 5,
  };

  const defaultPrice = {
    base: 500,
    businessClass: 100,
    window: 25,
    aisle: 25,
    last: 25,
  };

  const bookedSeats = ["1A", "1E", "10D", "8E"];

  const [seatStatus, setSeatStatus] = useState([]);

  const seatClickHandler = (e) => {
    console.log(e.currentTarget.getAttribute("seatid"));
  };

  const setClickHandler = (id) => {
    if (bookedSeats.indexOf(id) > -1) {
      return null;
    } else {
      return seatClickHandler;
    }
  };

  const setSeatStyle = (id) => {
    let style = { display: "flex", minWidth: "32px", position: "relative" };
    if (bookedSeats.indexOf(id) < 0) {
      style = { ...style, cursor: "pointer" };
    }
    return style;
  };

  const setSeatPrice = (row, column, division) => {
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
    console.log(price);
    return price;
  };

  let rows = [];
  for (let i = 0; i < defaultSeatData.rows; i++) {
    let divisions = [];
    for (let j = 0; j < defaultSeatData.divisions; j++) {
      let columns = [];
      for (let k = 0; k < defaultSeatData.seatsPerDivision; k++) {
        const id = i + 1 + String.fromCharCode(j * 3 + k + 1 + 64);
        columns.push(
          <div
            seatid={id}
            info={id + " : $" + setSeatPrice(i, k, j)}
            key={id}
            onClick={setClickHandler(id)}
            className="seatIcon"
            style={setSeatStyle(id)}
            data-toggle="tooltip"
            // title={id}
          >
            <i
              className="material-icons"
              // data-toggle="tooltip"
              // title={id}
              style={{
                color: i < defaultSeatData.businessClass ? "orange" : "blue",
              }}
            >
              event_seat
            </i>
            {/* <p>{id}</p> */}
          </div>
        );
      }
      divisions.push(
        <div
          className="division"
          key={j}
          style={{ marginLeft: "32px", display: "flex" }}
        >
          {columns}
        </div>
      );
    }
    rows.push(
      <div className="seatRow" style={{ display: "flex" }} key={i}>
        {divisions}
      </div>
    );
  }

  return <div>{rows}</div>;
}

export default SeatMap;
