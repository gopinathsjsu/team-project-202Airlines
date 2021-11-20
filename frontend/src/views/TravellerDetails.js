import React from 'react';
import Axios from "axios";
import moment from 'moment';
import flightLogo from '../images/flightlogo.png';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import backendServer from "../webConfig";



export default function TravellerDetails() {

    Axios.defaults.withCredentials = true;
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    let { details } = useParams();
    let travellerDetails = JSON.parse(decodeURIComponent(details));
    let travellers = [];

    for (let i=1; i<=travellerDetails.travellers; i++) {
        travellers.push(
            <div className="card m-5">
                <h5 class="card-title m-2">Traveller {i}</h5>
                <div className="row m-2">
                    <div className="col-6">
                        <input className="form-control" type="text" placeholder="First Name"/>
                    </div>
                    <div className="col-6">
                        <input className="form-control" type="text" placeholder="Middle Name"/>
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-6">
                        <input className="form-control" type="text" placeholder="Last Name"/>
                    </div>
                    <div className="col-6">
                        <input className="form-control" type="text" placeholder="Age"/>
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-6">
                    <input type="date" className="form-control select-date" placeholder="YYYY-MM-DD"></input>
                    </div>

                    <div className="col-6 input-grp">
                         <select className="form-control">
                            <option>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-6">
                        <input className="form-control" type="text" placeholder="Nationality"/>
                    </div>
                </div>
            </div>)
    }

    const payment = (res) => {
        history.push("/paymentGateway");
   
  
        }

    
    return (
        <div className="">
            {
                travellers
            }
            
            <button type="button" className="btn btn-primary me-auto col-sm-2" onClick={payment}>Continue</button>
        </div>
    )
}
