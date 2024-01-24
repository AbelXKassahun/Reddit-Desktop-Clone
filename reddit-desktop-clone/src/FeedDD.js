import React from 'react';
import './CSS/FeedDD.css';
import { useInfn } from './Cache'


const FeedDD = (props) => {
    const clickedFeed = props.clickedFeed
    const isOpen = props.isOpen
    const toggleDropdown = props.toggleDropdown
    const feed = props.feed

    const fromCache = useInfn();

    return (
        <div className="feed_drop_down_container" >
            <div className={`feed_drop_down_initial + ${fromCache.theme === 'dark' ? "feed_drop_down_initial_dark" : "feed_drop_down_initial_light"}`} onClick={toggleDropdown}>
                <div>
                    <img src="" alt="h" />
                    <h3>{ feed }</h3>
                </div>
                <img src="" alt="d" />
            </div>
            { isOpen && (
                <div className={`feed_dropdown + ${fromCache.theme === 'dark' ? 'feed_dropdown_dark' : 'feed_dropdown_light'}`} 
                    tabIndex={0} 
                    onBlur={toggleDropdown}
                    >
                    <input type="text" 
                    className={`community_filter + ${fromCache.theme === 'dark' ? "filter_dark" : "filter_light"}`} placeholder='Filter'/>
                    <div className="communities">
                        <p>YOUR COMMUNITIES</p>
                        <button className="create_community" onClick={toggleDropdown}><img src="" alt="" /><span>Create Community</span></button>
                        {/* fetch the joined communities(sorted by thier number of members), 
                            and iterate through them (.map) to create a bunch of button that redirect to the subreddit */}
                        {/* <button className='your_communities'><img src="" alt="sub logo" /> Community Name <img src="" alt="star" /></button> */}
                    </div>
                    <div className="feeds">
                        <p>FEEDS</p>
                        <button className="home_feed" onClick={() => {clickedFeed('Home'); toggleDropdown()} }><img src="" alt="" /><span>Home</span></button>
                        <button className="popular_feed" onClick={() => {clickedFeed('Popular'); toggleDropdown()}}><img src="" alt="" /><span>Popular</span></button>
                        <button className="all_feed" onClick={() => {clickedFeed('All'); toggleDropdown()}}><img src="" alt="" /><span>All</span></button>
                    </div>
                    <div className="others">
                        <p>OTHER</p>
                        <button className={fromCache.theme === 'dark' ? 'button_dark_hover' : 'button_light_hover'} onClick={toggleDropdown}><img src="" alt="" />Messages</button>
                        <button className={fromCache.theme === 'dark' ? 'button_dark_hover' : 'button_light_hover'} onClick={toggleDropdown}><img src="" alt="" />Create Post</button>
                        <button className={fromCache.theme === 'dark' ? 'button_dark_hover' : 'button_light_hover'} onClick={toggleDropdown}><img src="" alt="" />Notifications</button>  
                        <button className={fromCache.theme === 'dark' ? 'button_dark_hover' : 'button_light_hover'} onClick={toggleDropdown}><img src="" alt="" />User Settings</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeedDD;