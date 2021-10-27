import './css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigator from './components/Navigator';
import Home from './views/Home';
import InvalidPage from './views/InvalidPage';
import BookFlight from './views/BookFlight';
import MyTrip from './views/MyTrips';
import Signin from './views/Signin';
import SeatMap from './views/SeatMap';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navigator />
        <Switch>
          <Route path='/home' exact>
            <Home />
          </Route>
          <Route path='/bookFlight' exact>
            <BookFlight></BookFlight>
          </Route>
          <Route path='/myTrips' exact>
            <MyTrip></MyTrip>
          </Route>
          <Route path='/signin' exact>
            <Signin></Signin>
          </Route>
          <Route path='/seatmap' exact>
            <SeatMap></SeatMap>
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
