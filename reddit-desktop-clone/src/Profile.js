import {useState, useEffect} from 'react';
import './CSS/profile.css';


const Profile = () => {
    const [chosenOption, setChosenOption] = useState('posts');
    
    const handleoptions= (e) => {
        const name = e.target.name;
            console.log(name);
        const url = "dwadadaad";
        const endpoint = name === "posts" ? "X" : name === "comments" ? "B" : name === "history" ? "C" : 
        name === "saved" ? "D" : name === "upvoted_posts" ? "E" : "F"; 
        setChosenOption(e.target.name);

        // make an api call
    }

    useEffect(() => {
        // initial api call for posted posts
    },[])

    return (
        <div className="profile_container">
            <div className="profile_options">
                <button className="created_posts" name='posts' onClick={(e) => handleoptions(e)}>Posts</button>
                <button className="comments" name='comments' onClick={(e) => handleoptions(e)}>Comments</button>
                <button className="history" name='history' onClick={(e) => handleoptions(e)}>History</button>
                <button className="saved" name='saved' onClick={(e) => handleoptions(e)}>Saved</button>
                <button className="upvoted_posts" name='upvoted_posts' onClick={(e) => handleoptions(e)}>Upvoted</button>
                <button className="downvoted_posts" name='downvoted_posts' onClick={(e) => handleoptions(e)}>Downvoted</button>
                <button className="settings" name='settings' onClick={(e) => handleoptions(e)}>Settings</button>
                <button className="your_community" name='your_community' onClick={(e) => handleoptions(e)}>Your Community</button>

            </div>
            <div className="profileView">
                {/* {chosenOption === "comments" && } */} {/* use map*/}
                {/* {chosenOption !== "commemts" && } */}
            </div>
        </div>
    );
}

export default Profile;