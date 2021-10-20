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
          <Navbar bg='dark' variant='dark'>
            <Container>
              <Navbar.Brand>MyAirlines</Navbar.Brand>
              <Nav className='me-auto'>
                <Link to='/home' className='nav-link'>
                  Home
                </Link>
              </Nav>
              <Nav>
                <Link to='/addNewPage' className='nav-link'>
                  DemoPage
                </Link>
              </Nav>
              <Nav>
                <Link to='/unknownUrl' className='nav-link'>
                  Invalid pages
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
