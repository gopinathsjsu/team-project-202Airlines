import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function Navigator() {
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
              <Nav>
                <Link to="/seatmap/:details" className="nav-link">
                  Seat Page
                </Link>
              </Nav>
              <Nav>
                <Link to="/signin" className="nav-link">
                  SIGN IN
                </Link>
              </Nav>
              <Nav>
                <Link to="/signout" className="nav-link">
                  SIGN OUT
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </Row>
      </Container>
    </div>
  );
}

export default Navigator;
