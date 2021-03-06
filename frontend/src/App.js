import './css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import Navigator from './components/Navigator';
import Home from './views/Home';
import BookFlight from './views/BookFlight';
import FlightList from './views/FlightList';
import MyTrip from './views/MyTrips';
import Mileage from './views/Mileage';
import Signin from './views/Signin';
import Signup from './views/Signup';
import Signout from './views/signout';
import SeatMap from './views/SeatMap';
import UpdateBooking from './views/UpdateBooking';
import AdminHome from './views/AdminHome';
import FlightInfo from './views/FlightInfo';
import TravellerDetails from './views/TravellerDetails';

import AdminAddFlight from './views/AdminAddFlight';
import Payment from './views/Payment';
import FlightUpdateSearch from './views/FlightUpdateSearch';
import FlightDateUpdate from './views/FlightDateUpdate';
import Summary from './views/Summary';
import UserProfile from './views/UserProfile';
import AdminFlightDetail from './views/AdminFlightDetail';

function App() {
  const [userState, setuserState] = useState(0);

  return (
    <div className="App">
      <Router>
        <Navigator />
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/bookFlight" exact>
            <BookFlight />
          </Route>
          <Route path="/myTrips" exact>
            <MyTrip />
          </Route>
          <Route path="/updateBooking/:id" exact>
            <UpdateBooking />
          </Route>
          <Route path="/mileage" exact>
            <Mileage />
          </Route>
          <Route path="/signin" exact>
            <Signin />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/signout" exact>
            <Signout />
          </Route>
          <Route path="/seatmap" exact>
            <SeatMap />
          </Route>
          <Route path="/flightList" exact>
            <FlightList />
          </Route>
          <Route path="/adminHome" exact>
            <AdminHome />
          </Route>
          <Route path="/adminNewFlight" exact>
            <AdminAddFlight />
          </Route>
          <Route path="/flightInfo" exact>
            <FlightInfo />
          </Route>
          <Route path="/travellerDetails" exact>
            <TravellerDetails />
          </Route>
          <Route path="/paymentGateway" exact>
            <Payment />
          </Route>
          <Route path="/updateflightList/:details" exact>
            <FlightUpdateSearch />
          </Route>
          <Route path="/flightDateUpdate/:details" exact>
            <FlightDateUpdate />
          </Route>
          <Route path="/bookingSummary" exact>
            <Summary />
          </Route>
          <Route path="/userProfile" exact>
            <UserProfile />
          </Route>
          <Route path="/flightDetails/:flight_id" exact>
            <AdminFlightDetail />
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
