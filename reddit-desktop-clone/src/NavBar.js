import { useInfn } from './Cache'
import React, { useState, useEffect, useRef }from 'react';
import { useNavigate } from "react-router-dom";
import './CSS/NavBar.css';
import FeedDD  from './FeedDD.js';
import SearchDD from './SearchBarDD.js';
import UserDD from './UserDD';
import { Link } from 'react-router-dom';


const NavBar = () => {
    const fromCache = useInfn();
    const navigate = useNavigate();

    const [feed, setFeed ] = useState("Home")
    const [isOpen, setIsOpen] = useState(false);

    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    const toggleDropdown = () => {
        setIsOpen(isOpen ? false : true);
    }
    const clickedFeed = (feed) => {
        setFeed(feed)
        // you also set the icon for whichever is clicked
    }

    const handleLoginBtn = () => {
        navigate('/login');
    }

    const handleProfile = () => {
        navigate('/profile');
    }

    // const isMounted = useRef(false);
    
    // useEffect(() => {
    //     if (!isMounted.current) {
    //         isMounted.current = true;
    //     }
    //     else{
    //         console.log('from navbar');
    //         console.log(fromCache);
    //     }
    // }, [fromCache])


    // {`navbar + ${fromCache.theme === 'light' ? "navbar-light" : "navbar-dark"}`}
    return (
        <div className="navbar navbar-dark ">
            <div className="brand">
                <img src={require("./Assets/Icons/reddit.png")} alt=""/>
                <h1 className="reddit_brand" 
                style={fromCache.theme === 'dark' ? {color: "#fff"} : {color: "#ff4500"}}
                onClick = 
                    {() => {navigate('/')}}
                >reddit</h1>
            </div>


            <div className={`search_bar_container +  ${fromCache.theme === 'dark' ? 'search_bar_dark' : 'search_bar_light'}`}>
                <div className="search_bar">
                    <span className="material-symbols-outlined">search</span>
                    <input
                        type="text"
                        placeholder="Search Reddit"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                </div>
                {/* Search Drop down */}
                {query && isFocused &&  (<SearchDD/>)}
            </div>
            {!fromCache.loggedIn  && (<button className="login_btn" onClick={() => {handleLoginBtn()}}>Log In</button>)}                
            {fromCache.loggedIn && (<button className='user_profile_toggle' onClick={() => {handleProfile()}}>User Profile</button>)}
        </div>
    )
}

export default NavBar;