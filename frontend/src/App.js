import './css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigator from './components/Navigator';
import Home from './views/Home';
import InvalidPage from './views/InvalidPage';
import BookFlight from './views/BookFlight';
import FlightList from './views/FlightList';
import MyTrip from './views/MyTrips';
import Signin from './views/Signin';
import Signup from './views/Signup';
import SeatMap from './views/SeatMap';
import UpdateBooking from './views/UpdateBooking';

function App() {
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
          <Route path="/updateBooking/:booking_id" exact>
            <UpdateBooking />
          </Route>
          <Route path="/signin" exact>
            <Signin />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/seatmap" exact>
            <SeatMap />
          </Route>
          <Route path="/flightList/:details" exact>
            <FlightList />
          </Route>
          <Route>
            <Signup />
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
