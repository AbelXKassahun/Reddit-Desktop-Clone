import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Cache from './Cache.js';
import NavBar from './NavBar';
import Home from './Home';


function App() {
  // const location = useLocation()
  // const hideNavBar = location === './profile'
  const hideNavBar = false;
  return (
      <Cache>
        <Router>
          <div className="App">
            { !hideNavBar && (<NavBar/>) }
            <div className="content">
              <Switch>
                <Route exact path="/">
                  <Home/>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </Cache>
  );
}

export default App;
