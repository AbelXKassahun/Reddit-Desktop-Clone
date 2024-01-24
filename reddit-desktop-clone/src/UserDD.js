import React, {useEffect, useState} from 'react';
import { useInfn } from './Cache'
import './CSS/userDD.css';


const UserDD = (props) => {
    const fromCache = useInfn();

    const [isOpen, setIsOpen] = useState(false)
    const toggleDropdown = () => {
        setIsOpen(isOpen ? false : true)
    }

    return (
        <div className="user_dropdown_container">
            <div className="user_dropdown_initial" onClick={toggleDropdown}>
                <img src="" alt="" />
                <div className="user_infn">
                    <h4>u/username</h4>
                    <p>8.5k Karma</p>
                </div>
                <img src="" alt="" style={{'alignSelf': 'flex-end'}}/>
            </div>
            {isOpen && (
                <div className="user_dropdown">
                    <div className="my_stuff">
                        <img src="" alt="" />
                        <h3>My Stuff</h3>
                    </div>
                    <button><img src="" alt="" /><span>Online Status</span><img src="" alt="" /></button>
                    <button><img src="" alt="" /><span>Profile</span></button>
                    <button><img src="" alt="" /><span>User Settings</span></button>
                    <br />
                    <div className="view_options">
                        <img src="" alt="" />
                        <h3>View Options</h3>
                    </div>
                    <button><img src="" alt="" /><span>Dark mode</span><img src="" alt="" /></button>
                    <br />
                    <button className="create_community"><img src="" alt="" /><span>Create Community</span></button>
                    {/* Explore */}
                    <button className="log_out"><img src="" alt="" /><span>Log Out</span></button>
                </div>
            )}
        </div>            
    );
}

export default UserDD;