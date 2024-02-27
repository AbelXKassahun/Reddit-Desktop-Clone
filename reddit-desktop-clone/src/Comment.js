import {useEffect, useRef, useState} from 'react';
import './CSS/comment.css';
import { useInfn } from './Cache';
import { useNavigate  } from 'react-router-dom';


const Comment = ({comment, replyToComment, inEditmode, isInProfile=false, setJustDeleted}) => {
    const fromCache = useInfn();
    const navigate = useNavigate();

    console.log(comment);

    const [upvoteClass, setUpvoteClass] = useState(null);
    const [downvoteClass, setDownvoteClass] = useState(null);
    const [repliedTo, setRepliedTo] = useState('');

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
            if(comment.reply_To){
                // api call
                setRepliedTo('a commenter')
            }
            else{
                // api call
                setRepliedTo('OP')
            }
        }
    },[comment])

    return (
        <>     
            { comment && upvoteClass && downvoteClass && (<div className="commentContainer">
                <div className="commentInfn">
                    <img className='profileImg' src="" alt="" />
                    <span className='commenter'>gegeakutami</span>
                    .
                    <span className='posted_date'>{fromCache.getTimeDifference(comment.commented_When)}</span>
                </div>
                <div className="commentText">
                    <span className="replying_to" >Replied To <span style={{color: "#4db6f7"}}>{repliedTo}</span></span>
                    <p className='commentItself'>{comment.comments}</p>
                </div>
                <div className="commentOptions">
                    <button className={`upvoteComment ${upvoteClass}`} onClick={() => handleUpvote()}></button>
                    <span className="upvoteCount">{comment.upvote_Count + offSet1}</span>

                    <button className={`downvoteComment ${downvoteClass}`} onClick={() => handleDownvote()}></button>
                    <span className="downvoteCount">{comment.downvote_Count + offSet2}</span>
                    {inEditmode && <button className="replyToComment" onClick={() => replyToComment(comment.user_Id)}><span className="material-symbols-outlined">reply</span> Reply</button>}
                    {isInProfile && (<button className='delete_comment' onClick={() => handleDelete()}><span className="material-symbols-outlined">delete</span>Delete Comment</button>)}

                </div>
            </div>)
            }
        </>
    );
}

export default Comment;

