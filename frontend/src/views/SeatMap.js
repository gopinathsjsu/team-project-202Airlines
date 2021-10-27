import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function SeatMap() {
  const defaultSeatData = {
    rows: 30,
    seatsPerDivision: 3,
    divisions: 3,
    aislePrice: 24,
    middleSeatPrice: 34,
  };

  const [seatStatus, setSeatStatus] = useState([]);

  const seatClickHandler = (e) => {
    console.log(e.currentTarget.getAttribute("seatid"));
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
            key={id}
            onClick={seatClickHandler}
            className="seatIcon"
            style={{ display: "flex", minWidth: "56px", position: "relative" }}
            data-toggle="tooltip"
            title={id}
          >
            <i className="material-icons" data-toggle="tooltip" title={id}>
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
          style={{ marginLeft: "64px", display: "flex" }}
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
