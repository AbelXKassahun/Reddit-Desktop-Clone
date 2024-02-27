import {useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import './CSS/profile.css';
import Settings from './Settings';
import YourCommunity from './YourCommunity';
import AboutUser from './AboutUser';
import Post from './post';
import Comment from './Comment';
import { useInfn } from './Cache';


const Profile = ({toggleNavbar}) => {
    const [chosenOption, setChosenOption] = useState('posts');
    const [url, setUrl] = useState('');
    const [content, setContent] = useState(null);
    const [trigReRender, setTrigReRender] = useState(false)


    const defaultStyle = {
        borderBottom: "none",
        pointerEvents: "auto"
    }

    const selectedStyle = {
        borderBottom: "1px solid #fff",
        pointerEvents: "none"
    }


    const navigate = useNavigate();
    const fromCache = useInfn();

    const triggerReRender = () => {
        if(trigReRender){
            setTrigReRender(false)
        }
        else{
            setTrigReRender(true)
        }
    }
    
    const handleoptions= (e) => {
        setContent(null)
        const name = e.target.name;
        const url = "https://localhost:7166/";
        const endpoint = name === "posts" ? `Post/GetUserPosts?Id=${fromCache.userId}` : 
        name === "comments" ? `Comment/GetUserComment?Id=${fromCache.userId}` : 
        name === "history" ? `History/GetHistory?Id=${fromCache.userId}` : 
        name === "saved" ? `Save/GetSaves?Id=${fromCache.userId}` : 
        name === "upvoted_posts" ? `UpvoteDownvote/GetUpvotedDownvoted?Id=${fromCache.userId}&type=${"Upvotes"}`  : 
        `UpvoteDownvote/GetUpvotedDownvoted?Id=${fromCache.userId}&type=${"Downvotes"}` ;

        setUrl(url+endpoint)

        setChosenOption(e.target.name);
        // make an api call


    }

    


    const isMounted2 = useRef(false);
    useEffect(() => {
        toggleNavbar(false);
        // initial api call for about user
        if (!isMounted2.current) {
            isMounted2.current = true;
            setChosenOption('about')
        }
        else{
            console.log('distress');
            if(chosenOption !== "about" && url){
                console.log(url);
                fetch(url)
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

    },[url, trigReRender, chosenOption])
    



    const closeProfile = () => {
        navigate(-1);
    }

    const clearHistory = () => {
        fetch(`https://localhost:7166/History/ClearHistory?Id=${fromCache.userId}`,{
            method: 'POST'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data)
            triggerReRender()
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    return (
        <div className='profile_container'>
            <div className="profile_close" onClick={() => closeProfile()}>
                <span className="material-symbols-outlined">arrow_back</span>
            </div>  
            <div className='optionsViews'>
                <div className="profile_options">
                    <button style={chosenOption === 'about' ? selectedStyle : defaultStyle} className="about_user" name='about' onClick={(e) => handleoptions(e)}>About</button>
                    <button style={chosenOption === 'posts' ? selectedStyle : defaultStyle} className="created_posts" name='posts' onClick={(e) => handleoptions(e)}>Posts</button>
                    <button style={chosenOption === 'comments' ? selectedStyle : defaultStyle} className="comments" name='comments' onClick={(e) => handleoptions(e)}>Comments</button>
                    <button style={chosenOption === 'history' ? selectedStyle : defaultStyle} className="history" name='history' onClick={(e) => handleoptions(e)}>History</button>
                    <button style={chosenOption === 'saved' ? selectedStyle : defaultStyle} className="saved" name='saved' onClick={(e) => handleoptions(e)}>Saved</button>
                    <button style={chosenOption === 'upvoted_posts' ? selectedStyle : defaultStyle} className="upvoted_posts" name='upvoted_posts' onClick={(e) => handleoptions(e)}>Upvoted</button>
                    <button style={chosenOption === 'downvoted_posts' ? selectedStyle : defaultStyle} className="downvoted_posts" name='downvoted_posts' onClick={(e) => handleoptions(e)}>Downvoted</button>
                    <button style={chosenOption === 'settings' ? selectedStyle : defaultStyle} className="settings" name='settings' onClick={(e) => handleoptions(e)}>Settings</button>
                    <button style={chosenOption === 'your_community' ? selectedStyle : defaultStyle} className="your_community" name='your_community' onClick={(e) => handleoptions(e)}>Your Community</button>
                </div>
                <div className="profileView"> {/*in profile.css there is .forPostAndComments class use it conditionally only for posts and comments*/}
                    {/* {chosenOption === "comments" && } */} {/* use map*/}
                    {/* {chosenOption !== "commemts" && } */}
                    {chosenOption === "about" && <AboutUser user_id = {fromCache.userId}/>}
                    {chosenOption === "posts" && content &&
                        (<div className="userPost_container">
                            {content.map((post) => (
                                <Post post={post} key={parseInt(post['$id'])} isInProfile={true} setJustDeleted={triggerReRender}/>
                            ))}
                        </div>)
                    }

                    {chosenOption === "comments" && content &&
                        (<div className="comment_container">
                            {content.map((comment) => (
                                <Comment comment={comment} key={comment['$id']} inEditmode={false} isInProfile={true} setJustDeleted={triggerReRender}/>
                            ))}
                        </div>)
                    }

                    {chosenOption && chosenOption !== "about" && !content && (<h3>Nothing to show here</h3>)}

                    {chosenOption === "saved" && content &&
                        (<div className="userPost_container">
                            {content.map((post) => (
                                <Post post={post} key={post.post_Id} isInProfile={false}/>
                            ))}
                        </div>)
                    }

                    {chosenOption === "history" && content &&
                        (
                            <>
                                <button className="clearHistory" onClick={() => clearHistory()}>Clear History</button>
                                <div className="userPost_container">
                                    {content.map((post) => (
                                        <Post post={post} key={post.post_Id} isInProfile={false}/>
                                    ))}
                                    <p>p</p>
                                </div>
                            </>
                        )
                    }

                    {chosenOption === "upvoted_posts" && content &&
                        (<div className="userPost_container">
                            {content.map((post) => (
                                <Post post={post} key={post.post_Id} isInProfile={false}/>
                            ))}
                        </div>)
                    }

                    {chosenOption === "downvoted_posts" && content &&
                        (<div className="userPost_container">
                            {content.map((post) => (
                                <Post post={post} key={post.post_Id} isInProfile={false}/>
                            ))}
                        </div>)
                    }

                    {chosenOption === "settings" && <Settings user_id ={fromCache.userId} username={fromCache.username} email={fromCache.email}/>}
                    {chosenOption === "your_community" && <YourCommunity sub_info={fromCache.ownedSub}/>}
                    {/* sub_info is an object of subreddit info from the model including sub_id */}
                </div>
            </div>
        </div>

    );
}

export default Profile;