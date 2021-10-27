import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function SeatMap() {
  const defaultSeatData = {
    rows: 30,
    seatsPerDivision:3,
    divisions: 3,
    aislePrice: 24,
    middleSeatPrice: 34,
  }

  let rows = [];
  for(let i =0; i<defaultSeatData.rows; i++){
    let divisions = [];
    for(let j=0;j<defaultSeatData.divisions;j++){
      let columns = [];
      for(let k=0;k<defaultSeatData.seatsPerDivision;k++ ){
        columns.push(<Col className="col"><i class="material-icons" color="yellow">event_seat</i>{i+1}{String.fromCharCode(j*3+k+1+64)}</Col>)
      }
      divisions.push(<Col className="division" style={{marginLeft:"64px"}}><Row>{columns}</Row></Col>)
    }
    rows.push(<Row className="seatRow" >{divisions}</Row>)
  }
  return <Container>
    
  {rows}
  </Container>;
}

export default SeatMap;
