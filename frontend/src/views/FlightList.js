import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import flightLogo from '../images/flightlogo.png';
import backendServer from '../webConfig';

let rows = [];

function FlightList() {
  Axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const { details } = useParams();
  const flightSearchDetails = JSON.parse(decodeURIComponent(details));
  const displayDate = moment(flightSearchDetails.flight_date).format('MMMM Do, YYYY');

  useEffect(() => {
    Axios.post(`${backendServer}/flightList`, flightSearchDetails).then((res) => {
      console.log(res);
      rows = res.data;
      setLoading(false);
    });
  }, []);

  const reviewFlight = (res) => {
    const { flight_date, flying_from, flying_to, travellers, flight_class, book_with } =
      flightSearchDetails;
    const { flight_number, start_time, end_time, price, miles } = res;
    const selectedFlight = {
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
    console.log(selectedFlight);
    history.push(`/flightInfo/${encodeURIComponent(JSON.stringify(selectedFlight))}`);
  };

        return (           
            <div className="container flight-info">
                 <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 row display-text">
                        <div className="col-4 text-center" >{flightSearchDetails.flying_from}</div>
                        <div className="col-4 text-center">
                            <img src={flightLogo} alt=" " width="100" height="100"></img>
                        </div>
                        <div className="col-4 text-center">{flightSearchDetails.flying_to}</div>
                    </div>
                    <div className="col-3"></div>
                </div>
                <br/>

      <br />
      <br />

      {loading ? (
        <div>Checking if flights are available for the selected....</div>
      ) : rows.length > 0 ? (
        <div>
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
                    moment(res.end_time, 'HH:mm:ss').diff(moment(res.start_time, 'HH:mm:ss'))
                  )
                  .asHours()}{' '}
                hours
              </div>
              <div className="col">
                {flightSearchDetails.book_with === 'Money' ? '$' : ''}
                {flightSearchDetails.book_with === 'Money' ? res.price : res.miles}
              </div>
              <button className="btn btn-default" type="button" onClick={() => reviewFlight(res)}>
                Select
              </button>
              <br />
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-danger">No Flights Are Available for the Selected dates</h2>
      )}
    </div>
  );
}
export default FlightList;
