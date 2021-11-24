import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { REDUCER } from '../utils/consts';

function Navigator() {
  const loginState = useSelector((state) => state.loginReducer);
  const errorState = useSelector((state) => state.errorReducer);

  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const isAdmin = JSON.parse(localStorage.getItem(REDUCER.ISADMIN));
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    console.log('initial render');
  }, []);

  useEffect(() => {
    console.log('entered change login state');
  }, [loginState]);

  const hideAlert = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  useEffect(() => {
    if (errorState[REDUCER.ERR_MSG] !== '') {
      setErrorMsg(errorState[REDUCER.ERR_MSG]);
      setShowAlert(true);
      hideAlert();
    }
  }, [errorState]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>MY-AIRLINE</Navbar.Brand>
              <Nav className="me-auto">
                <Link to="/home" className="nav-link">
                  HOME
                </Link>
              </Nav>

              {!isSignedIn && (
                <Nav>
                  <Link to="/signin" className="nav-link">
                    SIGN IN
                  </Link>
                </Nav>
              )}
              {isSignedIn && (
                <Nav>
                  <Link to="/signout" className="nav-link">
                    SIGN OUT
                  </Link>
                </Nav>
              )}
            </Container>
          </Navbar>
        </Row>
        {showAlert && (
          <div style={{ position: 'absolute', bottom: '10px', zIndex: '2' }}>
            <Alert variant="danger">{errorMsg}</Alert>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Navigator;
