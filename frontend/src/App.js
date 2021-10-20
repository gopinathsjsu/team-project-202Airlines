import './css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigator from './components/Navigator';
import Home from './views/Home';
import InvalidPage from './views/InvalidPage';
import SamplePage from './views/SamplePage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navigator />
        <Switch>
          <Route path='/home' exact>
            <Home />
          </Route>
          <Route path='/addNewPage' exact>
            <SamplePage></SamplePage>
          </Route>
          <Route path='*'>
            <InvalidPage> </InvalidPage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
