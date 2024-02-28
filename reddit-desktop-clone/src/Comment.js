import {useEffect, useRef, useState} from 'react';
import './CSS/comment.css';
import { useInfn } from './Cache';
import { Link, useNavigate  } from 'react-router-dom';



const Comment = ({comment, commentUnder, replyToComment, inEditmode, isInProfile=false, setJustDeleted}) => {
    const fromCache = useInfn();
    const navigate = useNavigate();

    console.log(comment);

    const [upvoteClass, setUpvoteClass] = useState(null);
    const [downvoteClass, setDownvoteClass] = useState(null);
    
    const [repliedTo, setRepliedTo] = useState('');
    const [repliedToId, setRepliedToId] = useState(comment.user_Id);

    const [commenter, setCommenter] = useState(null)

    const [offSet1, setOffSet1] = useState(0)
    const [offSet2, setOffSet2] = useState(0)


    const handleUpvote = () => {
        if(fromCache.loggedIn){
            if(upvoteClass==="upvoted"){
                setUpvoteClass("upvote");
                if(comment.upvote_flag){
                    setOffSet1(-1)
                }
                else{
                    setOffSet1(0)
                }
            }
            else{
                setUpvoteClass("upvoted");
                if(comment.upvote_flag){
                    setOffSet1(0)
                }
                else{
                    setOffSet1(1)
                    if(downvoteClass==="downvoted"){
                        setDownvoteClass("downvote");
                        if(comment.downvote_flag){
                            setOffSet2(-1)
                        }
                        else{
                            setOffSet2(0)
                        }
                    }
                }
            }
            const url_dotnet = `https://localhost:7166/UpvoteDownvote/PostRate?User_Id=${fromCache.userId}&Id=${comment.comment_Id}&Rating=${1}&Type=${'comment'}`
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
            navigate('/login');
        }
        
    }

    const handleDownvote = () => {
        if(fromCache.loggedIn){
            if(downvoteClass==="downvoted"){
                setDownvoteClass("downvote");
                if(comment.downvote_flag){
                    setOffSet2(-1)
                }
                else{
                    setOffSet2(0)
                }
            }
            else{
                setDownvoteClass("downvoted");
                if(comment.downvote_flag){
                    setOffSet2(0)
                }
                else{
                    setOffSet2(1)
                    if(upvoteClass==="upvoted"){
                        setUpvoteClass("upvote");
                        if(comment.upvote_flag){
                            setOffSet1(-1)
                        }
                        else{
                            setOffSet1(0)
                        }
                    }
                }
            }
            const url_dotnet = `https://localhost:7166/UpvoteDownvote/PostRate?User_Id=${fromCache.userId}&Id=${comment.comment_Id}&Rating=${0}&Type=${'comment'}`
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
            navigate('/login');
        }

    }

    const handleDelete = () => {
        fetch(`https://localhost:7166/Comment/DeleteComment?Comment_Id=${comment.comment_Id}`,{
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


    useEffect(() => {
        if(comment){
            if(comment.user_Id){
                const url_dotnet = `https://localhost:7166/User/GetUserInfo?Id=${comment.user_Id}`;
                fetch(url_dotnet)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setCommenter(data.userName)
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            }

            if(comment.upvote_flag == true){
                setUpvoteClass("upvoted")
            }
            else{
                setUpvoteClass("upvote");
            }
            //////////////////////
            if(comment.downvote_flag == true){
                setDownvoteClass("downvoted")
            }
            else {
                setDownvoteClass("downvote")
            }
            //////////////////////
            if(comment.reply_To !== "null"){
                // api call
                const url_dotnet = `https://localhost:7166/User/GetUserInfo?Id=${comment.reply_To}`;
                fetch(url_dotnet)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setRepliedTo(data.userName)
                    setRepliedToId(data.id)
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            }
            else{
                // api call
                console.log(commentUnder);
                // setRepliedTo(commentUnder.username)
                const url_dotnet = `https://localhost:7166/User/GetUserInfo?Id=${commentUnder}`;
                fetch(url_dotnet)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setRepliedTo(data.userName + ' (OP)')
                    setRepliedToId(commentUnder)
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            }
        }
    },[comment, commentUnder])

    return (
        <>     
            { comment && upvoteClass && downvoteClass && (
                <div className="commentContainer">
                    <div className="commentInfn">
                        <img className='profileImg' src="" alt="" />
                        <Link className='commenter' to={`/uprofile/${comment.user_Id}`}>u/{commenter}</Link>
                        .
                        <span className='posted_date'>{fromCache.getTimeDifference(comment.commented_When)}</span>
                    </div>
                    <div className="commentText">
                        {/* <span className="replying_to" >Replied To <span style={{color: "#4db6f7"}}>{repliedTo}</span></span> */}
                        <Link className='replying_to' to={`/uprofile/${repliedToId}`}>Replied to <span style={{color: "#4db6f7"}}>u/{repliedTo}</span> </Link>
                        <p className='commentItself'>{comment.comments}</p>
                    </div>
                    <div className="commentOptions">
                        <button className={`upvoteComment ${upvoteClass}`} onClick={() => handleUpvote()}></button>
                        <span className="upvoteCount">{comment.upvote_Count + offSet1}</span>

                        <button className={`downvoteComment ${downvoteClass}`} onClick={() => handleDownvote()}></button>
                        <span className="downvoteCount">{comment.downvote_Count + offSet2}</span>
                        {inEditmode && <button className="replyToComment" 
                            onClick={() => {
                                if(fromCache.loggedIn){
                                    replyToComment(comment.user_Id)
                                }
                                else{
                                    navigate('/login');
                                }}}><span className="material-symbols-outlined">reply</span> Reply</button>}
                        {isInProfile && (<button className='delete_comment' onClick={() => handleDelete()}><span className="material-symbols-outlined">delete</span>Delete Comment</button>)}

                    </div>
                </div>
            )}
        </>
    );
}

export default Comment;

