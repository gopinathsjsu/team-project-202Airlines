import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBooking } from '../reducers/actions';
import { REDUCER } from '../utils/consts';

export default function TravellerDetails() {
  Axios.defaults.withCredentials = true;
  const history = useHistory();

  const dispatch = useDispatch();
  const flightDetails = useSelector((state) => state.bookingReducer);
  
  const travelersList = [];
  for (let i = 1; i <= flightDetails.travellers; i++) {
    travelersList.push({
      traveler: i,
      firstName: '',
      middleName: '',
      lastName: '',
      age: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
    });
  }
  const [travelerInfo, setTravellersInfo] = useState(travelersList);
  const [alertMessage, setAlertMessage] = useState("");
  const travellers = [];
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));

  for (let i = 0; i < travelersList.length; i++) {
    travellers.push(
        <div className="card m-5">
          <h5 className="card-title m-2">Traveler {i + 1}</h5>
          <div className="row m-2">
            <div className="col-6">
              <div className="row required-field">
                <div className="col-11 ">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => {
                      setTravellersInfo([...travelerInfo].map(object => {
                        if(object.traveler == i+1) {
                          return {
                            ...object,
                            firstName: e.target.value
                          }
                        }
                        else return object;
                      }))
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-11">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Middle Name"
                    onChange={(e) => {
                      setTravellersInfo([...travelerInfo].map(object => {
                        if(object.traveler == i+1) {
                          return {
                            ...object,
                            middleName: e.target.value
                          }
                        }
                        else return object;
                      }))
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row m-2">
            <div className="col-6">
              <div className="row required-field">
                <div className="col-11">
                  <input
                    className="form-control required-field"
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => {
                      setTravellersInfo([...travelerInfo].map(object => {
                        if(object.traveler == i+1) {
                          return {
                            ...object,
                            lastName: e.target.value
                          }
                        }
                        else return object;
                      }))
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row required-field">
                <div className="col-11">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Age"
                    onChange={(e) => {
                      setTravellersInfo([...travelerInfo].map(object => {
                        if(object.traveler == i+1) {
                          return {
                            ...object,
                            age: e.target.value
                          }
                        }
                        else return object;
                      }))
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row m-2">
            <div className="col-6">
              <div className="row required-field">
                <div className="col-11">
                  <input
                    type="date"
                    className="form-control select-date"
                    placeholder="YYYY-MM-DD"
                    onChange={(e) => {
                      setTravellersInfo([...travelerInfo].map(object => {
                        if(object.traveler == i+1) {
                          return {
                            ...object,
                            dateOfBirth: e.target.value
                          }
                        }
                        else return object;
                      }))
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-6 input-grp">
              <div className="row required-field">
                <div className="col-11">
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setTravellersInfo([...travelerInfo].map(object => {
                        if(object.traveler == i+1) {
                          return {
                            ...object,
                            gender: e.target.value
                          }
                        }
                        else return object;
                      }))
                    }}
                  >
                    <option>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row m-2">
            <div className="col-6">
              <div className="row required-field">
                <div className="col-11">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nationality"
                    onChange={(e) => {
                      setTravellersInfo([...travelerInfo].map(object => {
                        if(object.traveler == i+1) {
                          return {
                            ...object,
                            nationality: e.target.value
                          }
                        }
                        else return object;
                      }))
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  const payment = (e) => {
    e.preventDefault();
    flightDetails.travelerInfo = travelerInfo;
    let validDetails = false;
    for (const info of travelerInfo) {
      if(info.firstName !== "" && info.lastName !== "" && 
        info.age !== "" && info.dateOfBirth !== "" &&
        info.gender !== "" && info.nationality !== "") {
          validDetails = true;
        }else {
          setAlertMessage("Enter all the required travelers details");
        }
    }
    if(validDetails) {
      history.push(`/seatmap`);
      dispatch(updateBooking(flightDetails));
    }
  };

  const returnToSignIn = () => {
    history.push("/signin");
  }

  if (!isSignedIn){
    returnToSignIn();
  }

  return (
    <div className="">
      {alertMessage && (
          <div className="alert alert-danger" role="alert">
            {alertMessage}
          </div>
        )}
        <div className="">
          {travellers}
          <div className="row">
              <div className="col-sm-4"></div>
              <button type="button" className="btn btn-primary col-sm-4" onClick={payment}>
                Continue
              </button>
              <div className="col-sm-4"></div>
          </div>
          
        </div>
    </div>
    
  );
}
