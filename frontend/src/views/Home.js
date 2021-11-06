import React from 'react';
import flighLogo from '../images/flight.png';
import mytripLogo from '../images/mytrip.png';
import mileageLogo from '../images/mileage.png';
import { Link } from "react-router-dom";


function Home() {

	return ( 
    <div className="shoe-container mx-auto">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="card">
              <div className="card-body">
                <img src={flighLogo} alt=" " width="40" height="40"></img>
                <h5 className="card-title">Book The Flights</h5>
                <Link to="/bookFlight" className="btn btn-secondary btn-lg">Book Flight</Link>
              </div>
            </div>
          </div>
          <div className="col text-center">
            <div className="card">
              <div className="card-body">
                <img src={mytripLogo} alt=" " width="40" height="40"></img>
                <h5 className="card-title">View my Bookings</h5>
                <Link to="/myTrips" className="btn btn-secondary btn-lg">My Trips</Link>
              </div>
            </div>
          </div>
            

          <div className="col text-center">
            <div className="card">
              <div className="card-body">
                <img src={mileageLogo} alt=" " width="40" height="40"></img>
                <h5 className="card-title">Manage Mileage Account</h5>
                <Link to="/mileage" className="btn btn-secondary btn-lg">Mileage</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}

export default Home;
