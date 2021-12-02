import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBooking } from '../reducers/actions';
import { REDUCER } from '../utils/consts';
import { get } from '../utils/serverCall';

export default function TravellerDetails() {
  Axios.defaults.withCredentials = true;
  const history = useHistory();

  const dispatch = useDispatch();
  const flightDetails = useSelector((state) => state.bookingReducer);

  const defaultTraveller = {
    traveler: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
  };
  const [travelersList, setTravelerList] = useState([]);
  const [travelerInfo, setTravellersInfo] = useState([]);
  useEffect(() => {
    if (flightDetails.isUpdateMode === 1) {
      get('/getTravellers', { booking_id: flightDetails.booking_id }).then((result) => {
        console.log(result);
        const travelers = [];
        result.forEach((each, index) => {
          travelers.push({
            ...defaultTraveller,
            traveler: index,
            firstName: each.first,
            middleName: each.middle,
            lastName: each.last,
            nationality: each.nationality,
            age: each.age,
            gender: each.gender,
          });
        });
        setTravellersInfo(travelers);
      });
    } else {
      const travelers = [];
      for (let i = 1; i <= JSON.parse(flightDetails.travellers); i++) {
        travelers.push({ ...defaultTraveller, traveler: i });
      }
      setTravellersInfo(travelers);
    }
  }, []);

  const [alertMessage, setAlertMessage] = useState('');
  const travellers = [];
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));

  for (let i = 0; i < travelerInfo.length; i++) {
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
                  value={travelerInfo[i].firstName}
                  index={i}
                  onChange={(e) => {
                    setTravellersInfo((prev) => {
                      const update = prev;
                      update[e.target.getAttribute('index')].firstName = e.target.value;
                      return [...update];
                    });
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
                  value={travelerInfo[i].middleName}
                  index={i}
                  onChange={(e) => {
                    setTravellersInfo((prev) => {
                      console.log(prev);
                      const update = prev;
                      update[e.target.getAttribute('index')].middleName = e.target.value;
                      return [...update];
                    });
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
                  value={travelerInfo[i].lastName}
                  index={i}
                  onChange={(e) => {
                    setTravellersInfo((prev) => {
                      const update = prev;
                      update[e.target.getAttribute('index')].lastName = e.target.value;
                      return [...update];
                    });
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
                  value={travelerInfo[i].age}
                  index={i}
                  onChange={(e) => {
                    setTravellersInfo((prev) => {
                      const update = prev;
                      update[e.target.getAttribute('index')].age = e.target.value;
                      return [...update];
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row m-2">
          {/* <div className="col-6">
            <div className="row required-field">
              <div className="col-11">
                <input
                  type="date"
                  className="form-control select-date"
                  placeholder="YYYY-MM-DD"
                  onChange={(e) => {
                    setTravellersInfo(
                      [...travelerInfo].map((object) => {
                        if (object.traveler == i + 1) {
                          return {
                            ...object,
                            dateOfBirth: e.target.value,
                          };
                        }
                        return object;
                      })
                    );
                  }}
                />
              </div>
            </div>
          </div> */}

          <div className="col-6 input-grp">
            <div className="row required-field">
              <div className="col-11">
                <select
                  className="form-control"
                  value={travelerInfo[i].gender}
                  index={i}
                  onChange={(e) => {
                    setTravellersInfo((prev) => {
                      console.log(prev);
                      const update = prev;
                      update[e.target.getAttribute('index')].gender = e.target.value;
                      return [...update];
                    });
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
                  value={travelerInfo[i].nationality}
                  index={i}
                  onChange={(e) => {
                    setTravellersInfo((prev) => {
                      console.log(prev);
                      const update = prev;
                      update[e.target.getAttribute('index')].nationality = e.target.value;
                      return [...update];
                    });
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
      if (
        info.firstName !== '' &&
        info.lastName !== '' &&
        info.age !== '' &&
        // info.dateOfBirth !== '' &&
        info.gender !== '' &&
        info.nationality !== ''
      ) {
        validDetails = true;
      } else {
        setAlertMessage('Enter all the required travelers details');
      }
    }
    if (validDetails) {
      history.push(`/seatmap`);
      dispatch(updateBooking(flightDetails));
    }
  };

  const returnToSignIn = () => {
    history.push('/signin');
  };

  if (!isSignedIn) {
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
          <div className="col-sm-4" />
          <button type="button" className="btn btn-primary col-sm-4" onClick={payment}>
            Continue
          </button>
          <div className="col-sm-4" />
        </div>
      </div>
    </div>
  );
}
