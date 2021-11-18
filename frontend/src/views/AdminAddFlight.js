import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Autocomplete from '@mui/material/Autocomplete';
import backendServer from '../webConfig';
import '../css/index.css';

function AdminAddFlight() {
  const [airptCode, setAirptCode] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    Axios.get(`${backendServer}/getAirportCode`)
      .then((res) => {
        // console.log('code', res.data);
        setAirptCode(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const addNewFlight = (e) => {
    e.preventDefault();
    // const isValid = formValidation();

    const formData = new FormData(e.target);
    const fltNo = formData.get('fltNo');
    const src = formData.get('src');
    const dst = formData.get('dst');
    const fltDate = formData.get('fltDate');
    const strtTime = formData.get('strtTime');
    const endTime = formData.get('endTime');
    const fltType = formData.get('fltType');
    const seatNo = formData.get('seatNo');
    const mile = formData.get('mile');
    const amount = formData.get('amount');

    if (src === dst) {
      setErrMsg('Sourcs and Destination airport should be different');
    }

    Axios.post(`${backendServer}/addFlights`, {
      flight_number: fltNo,
      airport_code_src: src,
      airport_code_dst: dst,
      flight_date: fltDate,
      start_time: strtTime,
      end_time: endTime,
      flight_type: fltType,
      no_of_seats: seatNo,
      miles: mile,
      price: amount,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log('returned');
          console.log(response.data);
          //   window.location = '/adminHome';
        }
      })
      .catch((err) => {
        console.log('caught an error');
        console.log(err.response);
      });
  };

  return (
    <div className="flight-book-form">
      <h2 className="text-center" style={{ marginTop: '20px', color: 'white' }}>
        Add New Flights
      </h2>
      <br />
      <Form
        onSubmit={addNewFlight}
        style={{ maxWidth: '700px', margin: '10% auto 0', marginTop: '5px' }}
      >
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            <b style={{ color: 'white' }}>Flight Number</b>
          </Form.Label>
          <Form.Control
            className="mb-3 text-primary"
            type="text"
            name="fltNo"
            required
            style={{ borderWidth: '2px', borderBlockColor: 'skyblue' }}
          />
          <div className="row g-2">
            <div className="col auto">
              <Form.Label>
                <b style={{ color: 'white' }}>Departure Airport</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="src"
                required
                placeholder="Enter Departure Airport Code"
                style={{ borderWidth: '2px', borderBlockColor: 'skyblue' }}
              />
              {/* <Autocomplete
                // options={jobDtls.filter(companyName => nameComp)}
                options={airptCode}
                renderInput={(params) => <Form.Control {...params} variant="outlined" />}
                getOptionLabel={(option) => option.airport_code}
                value={airptCode.airport_code}
                name="src"
                onChange={(_event, airport_code) => {
                  setCode(airport_code);
                }}
                required
              /> */}
            </div>
            <div className="col auto">
              <Form.Label>
                <b style={{ color: 'white' }}>Arrival Airport</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="dst"
                required
                placeholder="Enter Arrival Airport Code"
                style={{ borderWidth: '2px', borderBlockColor: 'skyblue' }}
              />
            </div>
          </div>
          <br />
          <Form.Label>
            <b style={{ color: 'white' }}>Flight Date</b>
          </Form.Label>
          <Form.Control
            className="mb-3 text-primary"
            type="date"
            name="fltDate"
            required
            style={{ borderWidth: '2px', borderBlockColor: 'skyblue' }}
          />
          <br />
          <div className="row g-2">
            <div className="col auto">
              <Form.Label>
                <b style={{ color: 'white' }}>Start Time</b>
              </Form.Label>
              <Form.Control
                className="mb-3 text-primary"
                type="time"
                name="strtTime"
                required
                style={{ borderWidth: '2px', borderBlockColor: 'skyblue' }}
              />
            </div>
            <div className="col auto">
              <Form.Label>
                <b style={{ color: 'white' }}>End Time</b>
              </Form.Label>
              <Form.Control
                className="mb-3 text-primary"
                type="time"
                name="endTime"
                required
                style={{ borderWidth: '2px', borderBlockColor: 'skyblue' }}
              />
            </div>
          </div>
          <br />
          <Form.Label>
            <b style={{ color: 'white' }}>Flight Type</b>
          </Form.Label>
          <Form.Control
            className="mb-3 text-primary"
            type="text"
            name="fltType"
            required
            placeholder="International or Domestic"
            style={{ borderWidth: '2px', borderBlockColor: 'skyblue' }}
          />
          <br />
          <div className="row g-3">
            <div className="col auto">
              <Form.Label>
                <b style={{ color: 'white' }}>Number of Seats</b>
              </Form.Label>
              <Form.Control
                className="mb-3 text-primary"
                type="number"
                name="seatNo"
                required
                min="0"
                placeholder="0"
                style={{ borderWidth: '2px', borderBlockColor: 'skyblue' }}
              />
              <br />
            </div>
            <div className="col auto">
              <Form.Label>
                <b style={{ color: 'white' }}>Miles</b>
              </Form.Label>
              <Form.Control
                className="mb-3 text-primary"
                type="number"
                name="mile"
                required
                min="0"
                placeholder="0"
                style={{ borderWidth: '2px', borderBlockColor: 'skyblue' }}
              />
            </div>
            <div className="col auto">
              <Form.Label>
                <b style={{ color: 'white' }}>Price (in Dollars)</b>
              </Form.Label>
              <Form.Control
                className="mb-3 text-primary"
                type="number"
                name="amount"
                required
                min="0"
                placeholder="0"
                style={{ borderWidth: '2px', borderBlockColor: 'skyblue' }}
              />
            </div>
          </div>
          <br />
          <Button
            type="submit"
            style={{ marginLeft: '270px', paddingLeft: '50px', paddingRight: '50px' }}
          >
            <b>Add Flight</b>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AdminAddFlight;
