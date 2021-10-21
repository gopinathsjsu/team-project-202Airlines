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
              <Navbar.Brand>MY-AIRLINE</Navbar.Brand>
              <Nav className='me-auto'>
                <Link to='/home' className='nav-link'>
                  HOME
                </Link>
              </Nav>
              <Nav>
                <Link to='/signIn' className='nav-link'>
                  SIGN IN
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
