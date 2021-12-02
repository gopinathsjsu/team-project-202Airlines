import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import { get } from "../utils/serverCall";

function AdminFlightDetail() {
  const [getFlightsById, setGetFlightsById] = useState([]);
  const { flight_id } = useParams();

  const getFlightDetailsById = async (flightId) => {
    await get(`/getFlightsById/${flightId}`).then((res) => {
      console.log(res);
      setGetFlightsById(res);
    });
  };

  useEffect(() => {
    getFlightDetailsById(flight_id);
  }, []);

  return (
    <div>
      <form className="flight-book-form">
        <div className="Mileage-form-box">
          <h3 style={{ marginTop: "20px" }}>Flight Details</h3>
          <br />
          {getFlightsById.map((data, index) => (
            <div>
              <h4 style={{ marginLeft: "50px", textAlign: "left" }}>
                Flight Number : {data.flight_number}
              </h4>
              <br />
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                Flight From : {data.airport_code_src}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                Flight To : {data.airport_code_dst}
              </h5>
              <h5
                style={{ marginLeft: "50px", textAlign: "left" }}
                typeof={Date}
              >
                Departure Date: {data.flight_date}
              </h5>
              <h5
                style={{ marginLeft: "50px", textAlign: "left" }}
                typeof={Date}
              >
                Arrival Date: {data.arr_date}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                Start Time: {data.start_time}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                End Time: {data.end_time}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                Seats : {data.no_of_seats}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                Charges : {data.price}
              </h5>
              <h5 style={{ marginLeft: "50px", textAlign: "left" }}>
                Miles Required : {data.miles}
              </h5>

              <br />
              <br />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default AdminFlightDetail;
