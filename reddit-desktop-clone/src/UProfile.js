import {useState, useEffect, useRef} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './CSS/uProfile.css';
import AboutUser from './AboutUser';
import Post from './post';


const UProfile = ({toggleNavbar}) => {
    const [chosenOption, setChosenOption] = useState('about');
    const navigate = useNavigate();

    const id = useParams();

    const [content, setContent] = useState(null)

    const defaultStyle = {
        borderBottom: "none",
        pointerEvents: "auto"
    }

    const selectedStyle = {
        borderBottom: "1px solid #fff",
        pointerEvents: "none"
    }
    
    const handleoptions= (e) => {
        setChosenOption(e.target.name);
    }

    const isMounted = useRef(false);
    useEffect(() => {
        toggleNavbar(false);
        // initial api call for about user
        if (!isMounted.current) {
            isMounted.current = true;
        }
        else{
            console.log('distress');
            if(chosenOption !== "about"){
                fetch(`https://localhost:7166/Post/GetUserPosts?Id=${id.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if(data['$values'].length == 0){
                        console.log('empty');
                        setContent(null)
                    }
                    else{
                        setContent(data['$values'])
                    }

                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            }
        }

    },[chosenOption])

    const closeProfile = () => {
        navigate(-1);
    }
    return (
        <div className="uprofile">
            <div className="uprofile_close" onClick={() => closeProfile()}>
                <span className="material-symbols-outlined">arrow_back</span>
                <h4>Back</h4>
            </div>  
            <div className='optionsViews'>
                <div className="profile_options">
                    <button style={chosenOption === 'about' ? selectedStyle : defaultStyle} className="about_user" name='about' onClick={(e) => handleoptions(e)}>About</button>
                    <button style={chosenOption === 'posts' ? selectedStyle : defaultStyle} className="created_posts" name='posts' onClick={(e) => handleoptions(e)}>Posts</button>
                </div>
                <div className="profileView"> {/*in profile.css there is .forPostAndComments class use it conditionally only for posts and comments*/}
                    {chosenOption === "about" && <AboutUser user_id={id.id}/>}
                    {chosenOption === "posts" && content &&
                        (<div className="userPost_container">
                            {content.map((post) => (
                                <Post post={post} key={parseInt(post['$id'])} />
                            ))}
                        </div>)
                    }
                    {chosenOption !== "about" && !content && (<h3>Nothing to show here</h3>)}

                </div>
            </div>
        </div>
    );
}

export default UProfile;