import { useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { post } from '../utils/serverCall';
import classnames from "classnames";

function Signin() {

  return (
<form className="flight-book-form">
        <div className="login-form-box">
        <div className="login-form" style={{color: 'white'}} >
           <h2 className="heading-section text-center"  >Login</h2>
           <h3 class="mb-4 text-center"  >Have an account?</h3>
            <input type="text" className="form-control" placeholder="Username"/><br/>
            <input type="text" className="form-control" placeholder="Password"/><br/>
<button type="submit" className="form-control" ><h4>Login</h4></button>
<br/>
<p class="w-100 text-center" >&mdash; Haven't registered yet &mdash;</p>
            <a href="Signup" ><h4 style={{color: 'white', textAlign: "center"}}>SignUp</h4></a>
        </div>
        </div>
    </form>
        
  )
}

export default Signin;
