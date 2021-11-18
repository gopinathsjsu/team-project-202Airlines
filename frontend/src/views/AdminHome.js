import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import flightLogo from '../images/flightlogo.png';
import backendServer from '../webConfig';
import '../css/index.css';

function AdminHome() {
  const [show, setShow] = useState(false);
  const [getFlights, setGetFlights] = useState([]);
  const [getFlightsById, setGetFlightsById] = useState([]);
  const handleClose = () => setShow(false);

  const getFlightDetailsById = async (flightId) => {
    await Axios.get(`${backendServer}/getFlightsById/${flightId}`).then((res) => {
      console.log(res.data);
      setGetFlightsById(res.data);
    });
  };

  const editFlightDetails = (e) => {
    e.preventDefault();
    // const isValid = formValidation();

    const formData = new FormData(e.target);
    const src = formData.get('src');
    const dst = formData.get('dst');
    const fltDate = formData.get('fltDate');
    const strtTime = formData.get('strtTime');
    const endTime = formData.get('endTime');
    const fltType = formData.get('fltType');
    const seatNo = formData.get('seatNo');
    const mile = formData.get('mile');
    const amount = formData.get('amount');

    Axios.post(`${backendServer}/editFlights`, {
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
          window.location = '/adminHome';
        }
      })
      .catch((err) => {
        console.log('caught an error');
        console.log(err.response);
      });
  };

  useEffect(() => {
    Axios.get(`${backendServer}/getFlights`).then((res) => {
      console.log(res.data);
      setGetFlights(res.data);
    });
  }, []);

  return (
    <div className="shoe-container mx-auto">
      <h2 className="text-center" style={{ marginTop: '20px' }}>
        Available Flights
      </h2>
      <br />
      <div className="card-container">
        {getFlights.map((data, key) => (
          <div
            className="card border-primary mb-3"
            key={key}
            style={{ marginTop: '20px', marginInline: '1.5rem', width: '200px' }}
          >
            <h3 className="card-header" style={{ wordSpacing: '2rem' }}>
              {data.flight_number} {'   '}
              <MdModeEdit
                onClick={() => {
                  setShow(true);
                  getFlightDetailsById(`${data.flight_id}`);
                }}
              />
            </h3>
            <div className="card-body text-primary" style={{ wordSpacing: '2rem' }}>
              <b>{data.airport_code_src}</b> {'  '}
              <img src={flightLogo} alt=" " width="25" height="25" />
              {'  '}
              <b>{data.airport_code_dst}</b>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Edit Flight Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editFlightDetails} className="mb-3 text-primary">
            {getFlightsById.map((data, key) => (
              <Form.Group controlId="formFile" className="mb-3 text-primary">
                <Form.Label>Departure Airport</Form.Label>
                <Form.Control
                  className="mb-3 text-primary"
                  type="text"
                  name="src"
                  defaultValue={data.airport_code_src}
                  required
                />
                <br />
                <Form.Label>Arrival Airport</Form.Label>
                <Form.Control
                  className="mb-3 text-primary"
                  type="text"
                  name="dst"
                  defaultValue={data.airport_code_dst}
                  required
                />
                <br />
                <Form.Label>Flight Date</Form.Label>
                <Form.Control
                  className="mb-3 text-primary"
                  type="date"
                  name="fltDate"
                  defaultValue={data.flight_date}
                  required
                />
                <br />
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  className="mb-3 text-primary"
                  type="time"
                  name="strtTime"
                  defaultValue={data.start_time}
                  required
                />
                <br />
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  className="mb-3 text-primary"
                  type="time"
                  name="endTime"
                  defaultValue={data.end_time}
                  required
                />
                <br />
                <Form.Label>Flight Type</Form.Label>
                <Form.Control
                  className="mb-3 text-primary"
                  type="text"
                  name="fltType"
                  defaultValue={data.flight_type}
                  required
                />
                <br />
                <Form.Label>Number of Seats</Form.Label>
                <Form.Control
                  className="mb-3 text-primary"
                  type="number"
                  name="seatNo"
                  defaultValue={data.no_of_seats}
                  required
                />
                <br />
                <Form.Label>Miles</Form.Label>
                <Form.Control
                  className="mb-3 text-primary"
                  type="number"
                  name="mile"
                  defaultValue={data.miles}
                  required
                />
                <br />
                <Form.Label>Price (in Dollars)</Form.Label>
                <Form.Control
                  className="mb-3 text-primary"
                  type="number"
                  name="amount"
                  defaultValue={data.price}
                  required
                />
                <br />
                <Button type="submit">Update Details</Button>
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminHome;
