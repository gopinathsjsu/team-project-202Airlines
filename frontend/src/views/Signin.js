import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { post } from '../utils/serverCall';
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
            <Form.Label>Access ID</Form.Label>
            <Form.Control
              name='id'
              type='text'
              placeholder='Enter Id'
              required
              onChange={eventHandler}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              type='password'
              placeholder='Enter Password'
              required
              onChange={eventHandler}
            />
          </Form.Group>
          <Button variant='primary' type='submit' onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
}

export default Signin;
