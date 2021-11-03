import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Form } from "react-bootstrap";

//Define a Login Component
class Signup extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            emailid: "",
            password1 : "",
            role: "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.emailidChangeHandler = this.emailidChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.roleChangeHandler = this.roleChangeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    emailidChangeHandler = (e) => {
        this.setState({
            emailid : e.target.value
        })
    }
    roleChangeHandler = (e) => {
        this.setState({
            role : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitForm = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password,
            emailid: this.state.emailid,
            role: this.state.role
        }
        console.log(this.state.username + "pass" + this.state.password);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/signupUser',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("status" + response.status);
                    alert("Registered successfully");
                }else{
                    console.log("status" + response.status);
                    this.setState({
                        authFlag : false
                    })
                    alert("Fill all the details");
                }
            }).catch(error => {
                console.log(error.response)
            });
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/home"/>
        // }
        return(
            <div>
                {redirectVar}
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Sign Up</h2>
                            <p>Please fill your details</p>
                        </div>
    
                            <div class="form-group">

                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="User Name" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.emailidChangeHandler} type="text" class="form-control" name="emailid" placeholder="Email Id" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" required/>
                            </div>
                            <button onClick = {this.submitForm} class="btn btn-primary">Signup</button>  
                            <div className="form-group">
                                <a href="login">Login</a>
                            </div>                
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
//export Login Component
export default Signup;