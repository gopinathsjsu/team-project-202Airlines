import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function SeatMap() {
  const defaultSeatData = {
    rows: 30,
    seatsPerDivision: 3,
    divisions: 3,
    aislePrice: 24,
    middleSeatPrice: 34,
  };

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
          <Col
            seatid={id}
            key={id}
            onClick={seatClickHandler}
            className="seatIcon"
          >
            <i className="material-icons" color="yellow" title={id}>
              event_seat
            </i>
            {id}
          </Col>
        );
      }
      divisions.push(
        <Col className="division" key={j} style={{ marginLeft: "64px" }}>
          <Row>{columns}</Row>
        </Col>
      );
    }
    rows.push(
      <Row className="seatRow" key={i}>
        {divisions}
      </Row>
    );
  }
  return <Container>{rows}</Container>;
}

export default SeatMap;
