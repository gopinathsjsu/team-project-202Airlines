import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import flightLogo from '../images/flightlogo.png';
import backendServer from '../webConfig';
import '../css/index.css';

function AdminProfile() {
    const [show, setShow] = useState(false);
    const [getFlights, setGetFlights] = useState([]);
    const [getFlightsById, setGetFlightsById] = useState([]);
    const handleClose = () => setShow(false);
  

    useEffect(() => {
        Axios.get(`${backendServer}/getFlights`).then((res) => {
          console.log(res.data);
          setGetFlights(res.data);
        });
      }, []);