import { useInfn } from './Cache'
import React, { useState, useEffect }from 'react';
import './CSS/NavBar.css';
import FeedDD  from './FeedDD.js';
import SearchDD from './SearchBarDD.js';
import UserDD from './UserDD';

const NavBar = () => {
    const fromCache = useInfn();

    const [feed, setFeed ] = useState("Home")
    const [isOpen, setIsOpen] = useState(false);

    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

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


    // {`navbar + ${fromCache.theme === 'light' ? "navbar-light" : "navbar-dark"}`}
    return (
        <>
            <div className={`navbar + ${fromCache.theme === 'dark' ? "navbar-dark" : "navbar-light"}`}>
                <div className="brand">
                    <img src={require("./Assets/Icons/reddit.png")} alt=""/>
                    <h1 className="reddit_brand" 
                    style={fromCache.theme === 'dark' ? {color: "#fff"} : {color: "#ff4500"}}
                    onClick = 
                        {() => {fromCache.toggleTheme()}}
                    >reddit</h1>
                </div>
                {fromCache.loggedIn &&
                    (<FeedDD feed = { feed } clickedFeed = { clickedFeed } isOpen = { isOpen } toggleDropdown = {toggleDropdown}/>)
                }

                <div className={`search_bar_container +  ${fromCache.theme === 'dark' ? 'search_bar_dark' : 'search_bar_light'}`}>
                    <div className="search_bar">
                        <img src={require("./Assets/Icons/search4.png")} alt="" />
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
                {fromCache.loggedIn && (
                    <div className="icon_decs">
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                    </div>
                )}
                {!fromCache.loggedIn && (<button className="login_btn" onClick={() => {}}>Log In</button>)}                
                {/* user dropdown */}
                {fromCache.loggedIn && (<UserDD isOpen = { isOpen } toggleDropdown = {toggleDropdown}/>)}
                
            </div>
        </>
    )
}

export default NavBar;