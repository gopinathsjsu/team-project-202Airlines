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
import FlightInfo from './views/FlightInfo';
import TravellerDetails from './views/TravellerDetails';
import Payment from './views/Payment'

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
          <Route path="/signin" exact>
            <Signin />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/seatmap" exact>
            <SeatMap />
          </Route>
          <Route path='/flightList/:details' exact>
            <FlightList></FlightList>
          </Route>
          <Route path='/flightInfo/:details' exact>
            <FlightInfo></FlightInfo>
          </Route>
          <Route path='/travellerDetails/:details' exact>
            <TravellerDetails></TravellerDetails>
          </Route>
          <Route path='/paymentGateway' exact>
            <Payment></Payment>
          </Route>

          <Route path='*'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
