import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import flightLogo from "../images/flightlogo.png";
import { updateBooking } from "../reducers/actions";
import { AIRPORTS, REDUCER } from "../utils/consts";
import { post } from "../utils/serverCall";

function FlightList() {
  Axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const flightSearchDetails = useSelector((state) => state.bookingReducer);
  const [flightDetails, setFlightDetails] = useState(flightSearchDetails);
  const [rows, setFlightList] = useState([]);
  const flightDate = moment(flightSearchDetails.flight_date).format(
    "MMMM Do YYYY"
  );
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));

  useEffect(() => {
    console.log(flightSearchDetails);
    post(`/flightList`, flightSearchDetails).then((res) => {
      setFlightList(res, rows);
      setLoading(false);
    });
  }, []);

  const getFlights = () => {
    post(`/flightList`, flightDetails).then((res) => {
      setFlightList(res, rows);
      setLoading(false);
    });
  };

  const reviewFlight = (res) => {
    const {
      flight_date,
      flying_from,
      flying_to,
      travellers,
      flight_class,
      book_with,
    } = flightSearchDetails;
    const { flight_number, start_time, end_time, price, miles, flight_id } =
      res;
    const selectedFlight = {
      flight_id,
      flight_date,
      flying_from,
      flying_to,
      travellers,
      flight_class,
      flight_number,
      start_time,
      end_time,
      book_with,
      price,
      miles,
    };
    history.push(`/flightInfo`);
    dispatch(updateBooking(selectedFlight));
  };

  const returnToSignIn = () => {
    history.push("/signin");
  };

  if (!isSignedIn) {
    returnToSignIn();
  }

  return (
    <div className="container flight-info flight-background-container">
      <div className="row">
        <div className="col-3" />
        <div className="col-6 row">
          <div className="col-4 text-center">
            <div className="display-text">
              {flightSearchDetails.flying_from}
            </div>
            {AIRPORTS.map((data, key) => {
              if (data.key === flightSearchDetails.flying_from)
                return <label key={key}>{data.value}</label>;
            })}
          </div>
          <div className="col-4 text-center mt-4">
            <img src={flightLogo} alt="->" width="100" height="100" />
          </div>
          <div className="col-4 text-center">
            <div className="display-text">{flightSearchDetails.flying_to}</div>
            {AIRPORTS.map((data, key) => {
              if (data.key === flightSearchDetails.flying_to)
                return <label key={key}>{data.value}</label>;
            })}
          </div>
        </div>
        <div className="col-3" />
      </div>
      <div className="row">
        <div className="col text-center">{flightDate}</div>
      </div>
      <br />
      <hr />
      <br />

      {loading ? (
        <div className="text-center">
          Checking if flights are available for the selected....
        </div>
      ) : rows.length > 0 ? (
        <div className="mx-5">
          <div className="row row-cols-6">
            <div className="col">
              <b>Flight Number</b>
            </div>
            <div className="col">
              <b>Start Time</b>
            </div>
            <div className="col">
              <b>End Time</b>
            </div>
            <div className="col">
              <b>Duration</b>
            </div>
            <div className="col">
              <b>{flightSearchDetails.book_with}</b>
            </div>
          </div>
          <br />

          {rows.map((res) => (
            <div className="row row-cols-6" key={res.flight_number}>
              <div className="col">{res.flight_number}</div>
              <div className="col">{res.start_time}</div>
              <div className="col">{res.end_time}</div>
              <div className="col">
                {moment
                  .duration(
                    moment(res.end_time, "HH:mm:ss").diff(
                      moment(res.start_time, "HH:mm:ss")
                    )
                  )
                  .asHours()}{" "}
                hours
              </div>
              <div className="col">
                {flightSearchDetails.book_with === "Money" ? "$" : ""}
                {flightSearchDetails.book_with === "Money"
                  ? res.price
                  : res.miles}
              </div>
              <button
                className="btn btn-default"
                type="button"
                onClick={() => reviewFlight(res)}
              >
                Select
              </button>
              <br />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-danger text-center">
            No Flights Are Available for the Selected dates
          </h2>
          <div className="row">
            <div className="col-5" />
            <div className="col-2">
              <h6 className="text-center">Select a different date</h6>
              <input
                type="date"
                className="form-control book select-date"
                required
                onChange={(e) => {
                  setFlightDetails({
                    ...flightDetails,
                    flight_date: e.target.value,
                  });
                  flightSearchDetails.flight_date = e.target.value;
                  getFlights();
                }}
              />
            </div>
            <div className="col-5" />
          </div>
        </div>
      )}
    </div>
  );
}
export default FlightList;
