import React from 'react';
import Axios from "axios";
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateBooking } from '../reducers/actions';
import { REDUCER } from '../utils/consts';


export default function FlightInfo() {

    Axios.defaults.withCredentials = true;
    const history = useHistory();
    const dispatch = useDispatch();
    let selectedFlightDetails = useSelector((state) => state.bookingReducer);
    let displayDate = moment(selectedFlightDetails.flight_date).format('MMMM Do, YYYY');
    const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));

    const travellerInfo = (res) => {
        history.push(`/travellerDetails`);
        dispatch(updateBooking(selectedFlightDetails));
    }

    const returnToSignIn = () => {
        history.push("/signin");
      }
    
      if (!isSignedIn){
        returnToSignIn();
      }


    return(
        <div className="details-container font-weight-bold flight-background-container">
            <br/>
            <div>
                <h3 className="text-center">REVIEW TRIP SUMMARY</h3>
            </div>
            <br/><br/>
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 row">
                                    <label className="card-text col-6">Departing Date: </label>
                                    <label className="col-6 card-text"> {displayDate} </label>
                                </div>
                                <div className="col-12 row">
                                    <label className="card-text col-6">Departing From: </label>
                                    <div  className="card-text col-6">{selectedFlightDetails.flying_from}  </div>
                                </div>
                                <div className="col-12 row">
                                    <label className="card-text col-6">Arriving To: </label>
                                    <div  className="card-text col-6">{selectedFlightDetails.flying_to}  </div>
                                </div>
                                <div className="col-12 row">
                                    <label className="card-text col-6">Flight Number: </label>
                                    <div  className="card-text col-6">{selectedFlightDetails.flight_number}  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 row">
                                    <label className="card-text col-6">No of Travellers: </label>
                                    <label className="col-6 card-text">{selectedFlightDetails.travellers} </label>
                                </div>
                                <div className="col-12 row">
                                    <label className="card-text col-6">Departure Time: </label>
                                    <div  className="card-text col-6">{selectedFlightDetails.start_time}</div>
                                </div>
                                <div className="col-12 row">
                                    <label className="card-text col-6">Arrival Time: </label>
                                    <div  className="card-text col-6">{selectedFlightDetails.end_time}</div>
                                </div>
                                <div className="col-12 row">
                                    <label className="card-text col-6">Amount: </label>
                                    <div  className="card-text col-6">{(selectedFlightDetails.book_with==="Money")?"$":""}{(selectedFlightDetails.book_with==="Money")?selectedFlightDetails.price:selectedFlightDetails.miles}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row mt-5">
                    <div className="col-sm-4"></div>
                    <button type="button" className="btn btn-primary  col-sm-4" onClick={travellerInfo}>Continue</button>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        </div>
         )

}
