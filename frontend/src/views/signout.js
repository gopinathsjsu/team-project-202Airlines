import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import backendServer from '../webConfig';

const Signout = () => {
  Axios.defaults.withCredentials = true;
  const [loggedOut, setLoggedout] = useState(false);
  useEffect(async () => {
    Axios.get(`${backendServer}/signout`).then((response) => {
      console.log('loggedout');
      setLoggedout(true);
    });
  }, []);
  if (loggedOut) {
    return (
      <>
        <form className="flight-book-form">
          <div style={{ padding: 350, color: 'white' }}>
            <h1>Successfully logged out</h1>
            <Link to="/signin" style={{ fontSize: 35, textAlign: 'center' }}>
              Go to Login page
            </Link>
          </div>
        </form>
      </>
    );
  }
  return <>Please try again.</>;
};

export default Signout;
