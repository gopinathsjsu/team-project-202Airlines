import React from 'react';
import Axios from "axios";
import moment from 'moment';
import flightLogo from '../images/flightlogo.png';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import backendServer from "../webConfig";

let rows = [];
function FlightList() {
    Axios.defaults.withCredentials = true;
    const [loading, setLoading] = useState(true);

    let { details } = useParams();
    let flightSearchDetails = JSON.parse(decodeURIComponent(details));
    let displayDate = moment(flightSearchDetails.flight_date).format('MMMM Do, YYYY');;

    useEffect(() => {
        console.log(flightSearchDetails);
        Axios.post(`${backendServer}/flightList`, flightSearchDetails).then(function (res) {
            console.log(res);
            rows = res.data;
            setLoading(false);
        });
    }, []);
    if (loading) {
        return ("Loading data....");
    } else {
        return (
           
            <div className="container">
                 <div class="row">
                    <div className="col-3"></div>
                    <div class="col-6 row display-text">
                        <div class="col-4 text-center" >{flightSearchDetails.flying_from}</div>
                        <div className="col-4 text-center">
                            <img src={flightLogo} alt=" " width="100" height="100"></img>
                        </div>
                        <div class="col-4 text-center">{flightSearchDetails.flying_to}</div>
                    </div>
                    <div className="col-3"></div>
                </div>
                <br/>

                <div class="row">
                    <h2 className="col text-center">{displayDate}</h2>
                </div>

                <br/>
                <br/>

                <div className="row row-cols-6">
                    <div className="col"><b>Flight Number</b></div>
                    <div className="col"><b>Start Time</b></div>
                    <div className="col"><b>End Time</b></div>
                    <div className="col"><b>Duration</b></div>
                    <div className="col"><b>Price</b></div>
                </div>
                <br/>

                {rows.map(res =>
                    <div className="row row-cols-6" key={res.flight_number}>
                        <div className="col">{res.flight_number}</div>
                        <div className="col">{res.start_time}</div>
                        <div className="col">{res.end_time}</div>
                        <div className="col">{(moment.duration(moment(res.end_time,"HH:mm:ss").diff(moment(res.start_time,"HH:mm:ss")))).asHours()} hours</div>
                        <div className="col">${res.price}</div>
                        <button class="btn btn-default" type="button">Select</button>
                    </div>
                )}
            </div>

        );
    }
}
export default FlightList;