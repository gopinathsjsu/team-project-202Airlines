import { useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { post } from '../utils/serverCall';
import classnames from "classnames";

function Signin() {
  const defaultValues = {
    id: '',
    password: '',
  };
  const [formData, setFormData] = useState(defaultValues);
  const eventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/signin', formData).then(() => {});
  };

  return (
<Container>
      <Col>
        <Form>
          <Form.Group className='mb-3' controlId='formEmail'>
          <div className="panel">
           <h2>Login</h2>
           <p>Please enter your username and password</p>                                    
             </div> 
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              name='id'
              type='text'
              placeholder='Email Id'
              required
              onChange={eventHandler}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              type='password'
              placeholder='Password'
              required
              onChange={eventHandler}
            />
          </Form.Group>
          <Button variant='primary' type='submit' onClick={handleSubmit}>
            Submit
          </Button>
          <br/>
          <div className="form-group">
            <a href="register">SignUp</a>
          </div> 
        </Form>
      </Col>
    </Container>
        
  )
}

export default Signin;
