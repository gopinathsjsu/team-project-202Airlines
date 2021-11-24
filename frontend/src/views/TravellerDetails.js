import React from 'react';
import Axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateBooking } from '../reducers/actions';

export default function TravellerDetails() {
  Axios.defaults.withCredentials = true;
  const history = useHistory();

  const dispatch = useDispatch();
  const { details } = useParams();
  const flightDetails = JSON.parse(decodeURIComponent(details));
  const travelerInfo = [];
  for (let i = 1; i <= flightDetails.travellers; i++) {
    travelerInfo.push({
      firstName: '',
      middleName: '',
      lastName: '',
      age: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
    });
  }
  const travellers = [];

  for (let i = 0; i < travelerInfo.length; i++) {
    travellers.push(
      <div className="card m-5">
        <h5 className="card-title m-2">Traveler {i + 1}</h5>
        <div className="row m-2">
          <div className="col-6">
            <input
              className="form-control"
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                travelerInfo[i].firstName = e.target.value;
              }}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              type="text"
              placeholder="Middle Name"
              onChange={(e) => {
                travelerInfo[i].middleName = e.target.value;
              }}
            />
          </div>
        </div>
        <div className="row m-2">
          <div className="col-6">
            <input
              className="form-control"
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                travelerInfo[i].lastName = e.target.value;
              }}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              type="text"
              placeholder="Age"
              onChange={(e) => {
                travelerInfo[i].age = e.target.value;
              }}
            />
          </div>
        </div>
        <div className="row m-2">
          <div className="col-6">
            <input
              type="date"
              className="form-control select-date"
              placeholder="YYYY-MM-DD"
              onChange={(e) => {
                travelerInfo[i].dateOfBirth = e.target.value;
              }}
            />
          </div>

          <div className="col-6 input-grp">
            <select
              className="form-control"
              onChange={(e) => {
                travelerInfo[i].gender = e.target.value;
              }}
            >
              <option>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="row m-2">
          <div className="col-6">
            <input
              className="form-control"
              type="text"
              placeholder="Nationality"
              onChange={(e) => {
                travelerInfo[i].nationality = e.target.value;
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  const payment = (res) => {
    flightDetails.travelerInfo = travelerInfo;
    history.push(`/seatmap`);
    dispatch(updateBooking(flightDetails));
    // history.push(`/seatmap/${encodeURIComponent(JSON.stringify(flightDetails))}`);
  };

  return (
    <div className="">
      {travellers}
      <button type="button" className="btn btn-primary me-auto col-sm-2" onClick={payment}>
        Continue
      </button>
    </div>
  );
}
