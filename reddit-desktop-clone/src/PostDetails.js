import {useEffect, useState, useRef} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Post from './post';
import useFetch from './Custom Hook/useFetch';
import Comment from './Comment';
import './CSS/postDetails.css';
import { useInfn } from './Cache'


const PostDetails = ({toggleNavbar}) => {
    const fromCache = useInfn();

    const { post } = useParams();
    // const { search } = useLocation();
    const params = new URLSearchParams(post);
    const obj = Object.fromEntries(params.entries());
    // console.log(obj);

    const navigate = useNavigate();

    const [inputComment, setInputComment] = useState('👍')
    const [isAreply, setIsAreply] = useState(false);
    const [replyingTo, setReplyingTo] = useState('')
    const [replyToId, setReplyToId] = useState(null) 
    const [replyStyle, setReplyStyle] = useState({display: 'none'})

    const [opUsername, setOpUsername] = useState(null)

    const [justCommented, setJustCommented] = useState(false)
    const [comments, setComments] = useState(null);

    const isMounted = useRef(false);

    useEffect(() => {
        toggleNavbar(false);
        if (!isMounted.current) {
            isMounted.current = true;
        }
        else{
            // console.log(fromCache);
            if(replyToId){
                // make an api call to get the username 
                const url_dotnet = `https://localhost:7166/User/GetUserInfo?Id=${replyToId}`;
                fetch(url_dotnet)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setReplyingTo(`Replying to u/${data.userName}`)
                    setReplyStyle({display: 'flex'})
                    setOpUsername(data.userName)
                    console.log(data.id);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });

            }
        }
    }, [replyToId])

    const isMounted1 = useRef(false);

    useEffect(() => {
        toggleNavbar(false);
        if (!isMounted1.current) {
            isMounted1.current = true;
        }
        else{
            console.log(fromCache);
            if(fromCache.userId !== null){
                const url_dotnet = `https://localhost:7166/Comment/GetComment?Id=${fromCache.userId}&postId=${obj.post_Id}`
                fetch(url_dotnet)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setComments(data["$values"])
                    console.log(data["$values"]);
                    if(data["$values"].length === 0){
                        console.log('empty');
                        setInputComment('Be the first one to comment')
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            }
        }
    }, [fromCache])

    const isMounted2 = useRef(false);

    useEffect(() => {
        if (!isMounted2.current) {
            isMounted2.current = true;
        }
        else{
            const url_dotnet = `https://localhost:7166/Comment/GetComment?Id=${fromCache.userId}&postId=${obj.post_Id}`
            console.log(url_dotnet);
            fetch(url_dotnet)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setComments(data["$values"])
                console.log(data["$values"]);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
    },[justCommented])



    const handleFocus = (event) => {
        if(fromCache.loggedIn){
            event.target.select();
        }
        else{
            navigate('/login');
        }
    };

    const handleChange = (e) => {
        // no whitespace
        // i will use isAreply in here so the json to be sent depends on the value it holds
        setInputComment(e.target.value);
    }

    const replyToComment = (replyto) => {
        setIsAreply(true)
        setReplyToId(replyto)
    }

    const cancelReply = () => {
        setIsAreply(false);
        setReplyToId(null)
        setReplyingTo('')
        setReplyStyle({display: 'none'})
    }

    const closePostDetails = () => {
        navigate(-1);
    }

    
    const post_comment = async () => {
        const comment = {
            User_Id: fromCache.userId,
            Post_Id: obj.post_Id, 
            Sub_Id: obj.sub_Id, 
            Comments: inputComment,
            Reply_To: isAreply ? replyToId : "null",
            Commented_When: fromCache.getCurrentDate(), 
            Downvote_Count: 0, 
            Upvote_Count: 0
        }

        console.log(comment);

        // make an api call to create comment
        if(fromCache.loggedIn){
            const url_dotnet = 'https://localhost:7166/Comment/CreateComment';
            try {
                const response = await fetch(url_dotnet, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(comment)
                });
    
                if (!response.ok) {
                    throw new Error('Failed to upload comment');
                }
    
                // Handle success response
                const responseData = await response.text();
                setJustCommented(justCommented ? false : true)
                setInputComment('👍')
                console.log(responseData)
            } catch (error) {
                console.error('Error:', error);
            }
        }

    }


    return (
        <div className="post_details_contianer">
            <div className="profile_close" onClick={() => closePostDetails()}>
                <span className="material-symbols-outlined">arrow_back</span>
            </div>  
            {obj &&
                <div className="postContainer">
                    <Post post = {obj} inPostDetails={true}/>
                    <div className="postComment">
                        <span style={replyStyle}>{replyingTo}</span>
                        <textarea name="post_comment" id="" cols="30" rows="10" value={inputComment} onChange={(e) => handleChange(e)} onFocus={handleFocus}></textarea>
                        <div className="commentButton">
                            <button className="postComment" onClick={() => post_comment()}>Post</button>
                            <button className="cancel_reply" style={replyStyle} onClick={cancelReply}>Cancel Reply</button>
                        </div>
                    </div>
                    <hr />
                    {comments &&
                        (comments.map((comment) => (
                            <Comment comment={comment} commentUnder ={obj.user_Id} replyToComment={replyToComment} inEditmode={true} key={comment.comment_Id}/>
                        )))
                    }                    
                    <p>copyright</p>
                </div>
            }
        </div>

    );
}

export default PostDetails;