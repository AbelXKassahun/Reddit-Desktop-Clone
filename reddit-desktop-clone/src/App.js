import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Cache from './Cache.js';
import NavBar from './NavBar';
import Home from './Home';
import LoginSignup from './LoginSignup';
import Profile from './Profile';
import PostDetails from './PostDetails';
import Subreddit from './Subreddit';
import CreatePost from './CreatePost';
import UProfile from './UProfile';


function App() {
  const [hideNavBar, setHideNavBar ] = useState(false);
  const toggleNavbar = (val) => {
    setHideNavBar(val);
  }
  const getNavState = () => {
    return hideNavBar
  }

  return (
    <>
      <Cache>
        <Router>
          <div className="App">
            { !hideNavBar && (<NavBar/>) }
              <Routes>
                <Route
                    exact
                    path="/"
                    element={<Home toggleNavbar={toggleNavbar}/>}
                />
                <Route
                    exact
                    path="/login"
                    element={<LoginSignup toggleNavbar={toggleNavbar} getNavState={getNavState}/>}
                />
                <Route
                    exact
                    path="/profile"
                    element={<Profile toggleNavbar={toggleNavbar}/>}
                />
                <Route
                    exact
                    path="/post_details/:post"
                    element={<PostDetails toggleNavbar={toggleNavbar}/>}
                />
                <Route
                    exact
                    path="/subreddit/:id"
                    element={<Subreddit toggleNavbar={toggleNavbar}/>}
                />
                <Route
                    exact
                    path="/create_post/:id?"
                    element={<CreatePost toggleNavbar={toggleNavbar}/>}
                />
                <Route
                    exact
                    path="/uprofile/:id"
                    element={<UProfile toggleNavbar={toggleNavbar}/>}
                />
              </Routes>
            </div>
        </Router>
      </Cache>
    </>

  );
}

export default App;
