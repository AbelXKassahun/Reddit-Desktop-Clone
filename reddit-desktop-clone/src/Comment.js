import {useEffect, useState} from 'react';
import './CSS/comment.css';

const Comment = ({comment, upvoted, downvoted, replyTo, replyToComment, inEditmode}) => {

    const [upvoteClass, setUpvoteClass] = useState("upvote");
    const [downvoteClass, setDownvoteClass] = useState("downvote");
    const [replyStyle, setReplyStyle] = useState({display: "none"});
    const [down, setDown] = useState(false) // for testing purposes only

    const handleUpvote = () => {
        if(upvoted){
            setUpvoteClass("upvote");
            // make an api call
        }
        else{
            setUpvoteClass("upvoted");
            // make an api call
        }
    }

    const handleDownvote = () => {
        if(downvoted){
            setDownvoteClass("downvote");
            // make an api call
        }
        else{
            setDownvoteClass("downvoted");
            // make an api call
        }
    }



    useEffect(() => {
        if(upvoted){
            setUpvoteClass("upvoted")
        }
        //////////////////////
        if(downvoted){
            setDownvoteClass("downvoted")
        }
        //////////////////////
        if(replyTo){
            setReplyStyle({display: "flex"});
        }
    },[])

    return (
        <div className="commentContainer">
            <div className="commentInfn">
                <img className='profileImg' src="" alt="" />
                <span className='commenter'>gegeakutami</span>
                .
                <span className='posted_date'>3 hr ago</span>
            </div>
            <div className="commentText">
                <span className="replying_to" style={replyStyle}>Replying to <span style={{color: "#4db6f7"}}>{replyTo[1]}</span></span>
                <p className='commentItself'>I remember people that would use an entire can of this or Axe before going out. Head to fucking toe spray themselves, it was potent</p>
            </div>
            <div className="commentOptions">
                <button className={`upvoteComment ${upvoteClass}`} onClick={() => handleUpvote()}></button>
                <span className="upvoteCount">400</span>

                <button className={`downvoteComment ${downvoteClass}`} onClick={() => handleDownvote()}></button>
                <span className="downvoteCount">10</span>
                {inEditmode && <button className="replyToComment" onClick={() => replyToComment("yomama")}><span className="material-symbols-outlined">reply</span> Reply</button>}
            </div>
        </div>
    );
}

export default Comment;

