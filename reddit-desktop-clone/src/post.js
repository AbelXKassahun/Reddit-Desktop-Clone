import { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useInfn } from './Cache';
import ImageComponent from './ImageComponent';
import VideoComponent from './VideoComponent';
import "./CSS/Post.css";
import useMediaFetch from './Custom Hook/useMediaFetch';


const Post = ({post, isInProfile, setJustDeleted, inPostDetails=false}) => {
    const [saveStyle, setSaveStyle] = useState("bookmark")
    const [mediaUrl, setMediaUrl] = useState(null);
    const [upvoteClass, setUpvoteClass] = useState("upvote");
    const [downvoteClass, setDownvoteClass] = useState("downvote");

    const [upvoteCount, setUpvoteCount] = useState(post.upvotes);
    const [downvoteCount, setDownvoteCount] = useState(post.downvotes);

    const [sub_info, setSub_info] = useState(null)
    const [user_info, setUser_info] = useState(null)
    
    const [subIconUrl, setSubIconUrl] =useState(null)

    const [offSet1, setOffSet1] = useState(0)
    const [offSet2, setOffSet2] = useState(0)

    const fromCache = useInfn();
    const navigate = useNavigate();

    const fetch_media = () => {
        const fetch_url = post.post_Type === "image_post" ? `https://localhost:7166/CRUD/GetImage?image_path=${post.image_Name}` : 
                        post.post_Type === "video_post" ? `https://localhost:7166/CRUD/GetVideo?video_path=${post.video_Name}` : null
        
        if(fetch_url){
            fetch(fetch_url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const objectURL = URL.createObjectURL(blob);
                setMediaUrl(objectURL)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
    }


    // if after an api call rating count doesnt change then update it here manually
    const handleUpvote = () => {
        if(fromCache.loggedIn){
            if(upvoteClass==="upvoted"){
                setUpvoteClass("upvote");
                if(post.upvote_flag){
                    setOffSet1(-1)
                }
                else{
                    setOffSet1(0)
                }
            }
            else{
                setUpvoteClass("upvoted");
                if(post.upvote_flag){
                    setOffSet1(0)
                }
                else{
                    setOffSet1(1)
                    if(downvoteClass==="downvoted"){
                        setDownvoteClass("downvote");
                        if(post.downvote_flag){
                            setOffSet2(-1)
                        }
                        else{
                            setOffSet2(0)
                        }
                    }
                }
            }
            const url_dotnet = `https://localhost:7166/UpvoteDownvote/PostRate?User_Id=${fromCache.userId}&Id=${post.post_Id}&Rating=${1}&Type=${'post'}`
            fetch(url_dotnet, {
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
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
        else{
            // route to log in without using Link component
            navigate('/login');
        }
    }

    // if after an api call rating count doesnt change then update it here manually
    const handleDownvote = () => {
        if(fromCache.loggedIn){
            if(downvoteClass==="downvoted"){
                setDownvoteClass("downvote");
                if(post.downvote_flag){
                    setOffSet2(-1)
                }
                else{
                    setOffSet2(0)
                }
            }
            else{
                setDownvoteClass("downvoted");
                if(post.downvote_flag){
                    setOffSet2(0)
                }
                else{
                    setOffSet2(1)
                    if(upvoteClass==="upvoted"){
                        setUpvoteClass("upvote");
                        if(post.upvote_flag){
                            setOffSet1(-1)
                        }
                        else{
                            setOffSet1(0)
                        }
                    }
                }
            }

            const url_dotnet = `https://localhost:7166/UpvoteDownvote/PostRate?User_Id=${fromCache.userId}&Id=${post.post_Id}&Rating=${0}&Type=${'post'}`
            fetch(url_dotnet, {
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
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
        else{
            // route to log in without using Link component
            navigate('/login');
        }
    }

    // if after an api call save flag doesnt change then update it here manually
    const handleSave = () => {
        const val = {
            'User_Id': fromCache.userId,
            'Post_Id': post.post_Id
        }

        console.log(val);

        if(fromCache.loggedIn){
            if(saveStyle == "bookmark"){
                setSaveStyle("bookmarks");
                // make an api call
                const url_dotnet = `https://localhost:7166/Save/AddSave`
                fetch(url_dotnet, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(val)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            }
            else{
                setSaveStyle("bookmark");
                // make an api call
                const url_dotnet = `https://localhost:7166/Save/UnSave`
                fetch(url_dotnet, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(val)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            }
        }
        else{
            // route to log in without using Link component
            navigate('/login');
        }
    }

    const handleDelete = () => {
        fetch(`https://localhost:7166/CRUD/DeletePost?Post_Id=${post.post_Id}`,{
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
            setJustDeleted()
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    // history
    const handlePostDetails = () => {
        // console.log(post);
        const val = {
            User_Id: fromCache.userId,
            Post_Id: post.post_Id
        }
        if(!inPostDetails){
            console.log('not in post details');
            fetch('https://localhost:7166/History/AddPostHistory',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(val)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                console.log(data)
                const queryString = new URLSearchParams(post).toString();
                navigate(`/post_details/${queryString}`)            
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

            // delete the code below if the above code works
            const queryString = new URLSearchParams(post).toString();
            navigate(`/post_details/${queryString}`) 
        }
    }


    useEffect(() => {
        if(post.sub_Id){
            const url_dotnet = `https://localhost:7166/Subreddit/GetSubInfo?subredditId=${post.sub_Id}`;
            fetch(url_dotnet)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSub_info(data)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
        ///////////////////////////
        if(post.user_Id){
            const url_dotnet = `https://localhost:7166/User/GetUserInfo?Id=${post.user_Id}`;
            fetch(url_dotnet)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUser_info(data)
                console.log(data.id);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }

        if(post.upvote_flag === true){
            setUpvoteClass("upvoted")
        }
        else{
            setUpvoteClass("upvote");
        }
        //////////////////////
        if(post.downvote_flag === true){
            setDownvoteClass("downvoted")
        }
        else {
            setDownvoteClass("downvote")
        }
        //////////////////////
        if(post.saved_flag === true){
            setSaveStyle("bookmarks")
        }

        if(post.post_Type === 'image_post' || post.post_Type === 'video_post'){
            fetch_media();
        }

    }, [])

    useEffect(() => {
        if(sub_info){
            const url_dotnet = `https://localhost:7166/CRUD/GetImage?image_path=${sub_info.sub_IconImg_Name}`;
            fetch(url_dotnet)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const objectURL = URL.createObjectURL(blob);
                setSubIconUrl(objectURL)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }   
    },[sub_info])



    return (
        <div>
            {sub_info && subIconUrl && user_info &&
                <div className="post">
                    <div className="post_rating">
                        <button className={`upvoteComment ${upvoteClass}`} onClick={() => handleUpvote()}></button>
                        <p>{post.number_of_Upvotes + offSet1}</p>

                        <button className={`downvoteComment gg ${downvoteClass}`} onClick={() => handleDownvote()}></button>
                        <p>{post.number_Of_DownVotes + offSet2}</p>
                    </div>
                    <div className="right_section">
                        <div className="post_infn">
                            <Link className="subImgPost" to={`/subreddit/${post.sub_Id}`}><img src={subIconUrl} alt="" /></Link>{/*you need to pass the subreddit id as a query parameter */}
                            <Link to={`/subreddit/${post.sub_Id}`}>r/{sub_info.subreddit_Name}</Link>{/*you need to the subreddit id as a query parameter */}
                            <span>Posted by </span>
                            <Link to={`/uprofile/${user_info.id}`}>u/{user_info.userName}</Link>{/*you need to pass the user id as a query parameter */}
                            <span>{fromCache.getTimeDifference(post.posted_When)}</span>
                        </div>
                        <div className="actual_post" >
                            <div className="post_title" onClick={() => handlePostDetails()}>
                                <h3>{ post.title }</h3>
                            </div>
                            {post.post_Type === "image_post" && <ImageComponent url = {mediaUrl} />}
                            {post.post_Type === "video_post" && <VideoComponent url = {mediaUrl}/>}
                            {/* {post.post_type === "text_post" && <NormalPostComponent text_content = {post.text}/>} */}
                            {/* {post.post_type === "link_post" && <LinkPostComponent link = {post.link}/>} */}
                            {post.post_Type === "text_post" && 
                            (<div className='post_markdown' onClick={() => handlePostDetails()}>
                                <MDEditor.Markdown source={post.text} />
                            </div>)}
                        </div>
                        <div className="comment_save">
                            <button className="view_comment" onClick={() => handlePostDetails()} style={inPostDetails ? {pointerEvents: "none", opacity: 0.5} : {pointerEvents: "auto", opacity: 1}}><span className="material-symbols-outlined">comment</span>View Comments {post.number_Of_Comments}</button>
                            <button className="savePost" onClick={() => handleSave()}><span className="material-symbols-outlined">{saveStyle}</span>Save</button>
                            {isInProfile && (<button className='delete_post' onClick={() => handleDelete()}><span className="material-symbols-outlined">delete</span>Delete Post</button>)}
                        </div>
                    </div>
                </div>
            }
        </div>

    );
}

export default Post;