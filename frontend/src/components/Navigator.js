import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { REDUCER } from '../utils/consts';

function Navigator() {
  const loginState = useSelector((state) => state.loginReducer);

  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const isAdmin = JSON.parse(localStorage.getItem(REDUCER.ISADMIN));

  useEffect(() => {
    console.log('initial render');
  }, []);

  useEffect(() => {
    console.log('entered change login state');
  }, [loginState]);

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
      </Container>
    </div>
  );
}

export default Navigator;
