import { useState } from 'react';
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { post } from '../utils/serverCall';
import classnames from "classnames";
import {
    Button,
    FormControl,
    FormGroup,
    FormHelperText,
    MenuItem,
    Select,
    TextField,
  } from "@material-ui/core";

function Signup() {


  return (
<form className="flight-book-form">

        <div className="login-form" style={{color: 'white'}} >
        <Container>
           <h2 class="mb-4 text-center"  >Fill your details</h2>
      <Form>
      <div class="row">
        <Form.Group controlId="form.FirstName" class= "col">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text"/>
        </Form.Group>
        <Form.Group controlId="form.LastName" class= "col">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text"/>
        </Form.Group>
        </div>
        <div class="row">
        <Form.Group controlId="form.Email" class= "col">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group controlId="form.Password" class= "col">
            <Form.Label>password</Form.Label>
            <Form.Control type="password" />
        </Form.Group>
        </div>
        <Form.Group controlId="form.Address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" />
        </Form.Group>
        <div class="row">
        <Form.Group controlId="form.City" class= "col" >
            <Form.Label>City</Form.Label>
            <Form.Control type="text"  />
        </Form.Group>
        <Form.Group controlId="form.State" class= "col">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="form.Country" class= "col">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" />
        </Form.Group>
         </div> 
         <div class="row">
        <Form.Group controlId="form.Zipcode" class= "col" >
            <Form.Label>Zipcode</Form.Label>
            <Form.Control type="text"  />
        </Form.Group>
        <Form.Group controlId="form.Passport" class= "col">
            <Form.Label>Passport ID</Form.Label>
            <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="form.Gender" class= "col">
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select">
            <option value="Male">Male</option>
          <option value="Female">Female</option>
          </Form.Control>
        </Form.Group>
         </div>   
         <div class="row">
        <Form.Group controlId="form.Sec1" class= "col">
            <Form.Label>Security Question 1</Form.Label>
            <Form.Control as="select">
            <option value="0">What is your mother's maiden name?</option>
          <option value="1">What was the name of your first pet?</option>
          <option value="2">What was the name of your first school?</option>
                </Form.Control>
                <Form.Control type="text" placeholder="Answer:"/>
        </Form.Group>
        <Form.Group controlId="form.LastName" class= "col">
            <Form.Label>Security Question 2</Form.Label>
            <Form.Control as="select">
            <option value="0">What is your mother's maiden name?</option>
          <option value="1">What was the name of your first pet?</option>
          <option value="2">What was the name of your first school?</option>
                </Form.Control>
                <Form.Control type="text" placeholder="Answer:" />
                <br/>
        </Form.Group>
        <button type="submit" ><h4>Signup</h4></button>
        </div>
        
      </Form>
    </Container>
         </div>
            </form>
    
 
        
  )
}

export default Signup;
