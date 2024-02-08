import {useEffect, useState, useRef} from 'react';
import Post from './post';
import useFetch from './Custom Hook/useFetch';
import Comment from './Comment';
import './CSS/postDetails.css';

const PostDetails = () => {
    // const url_jsonServer = "http://localhost:8000/posts";
    // const {data: posts, isPending, error} = useFetch(url_jsonServer);
    const [inputComment, setInputComment] = useState('What are your thoughts?')
    const [isAreply, setIsAreply] = useState(false);
    const [replyStyle, setReplyStyle] = useState({display: "none"})
    const [replyingTo, setReplyingTo] = useState('')

    const handleFocus = (event) => {
        event.target.select();
    };

    const handleChange = (e) => {
        // no whitespace
        // i will use isAreply in here so the json to be sent depends on the value it holds
        setInputComment(e.target.value);
    }

    const replyToComment = (replyto) => {
        setIsAreply(true);
        setReplyingTo(`Replying to ${replyto}`)
        setReplyStyle({display: "flex"});
    }

    const cancelReply = () => {
        setIsAreply(false);
        setReplyingTo('')
        setReplyStyle({display: "none"});
    }



    return (
        <div className="postContainer">
            {/* <Post post = {posts[1]}/> */}
            <span style={replyStyle}>{replyingTo}</span>
            <textarea name="post_comment" id="" cols="30" rows="10" value={inputComment} onChange={(e) => handleChange(e)} onFocus={handleFocus}></textarea>
            <div className="commentButton">
                <button className="postComment">Post</button>
                <button className="cancel_reply" style={replyStyle} onClick={cancelReply}>Cancel Reply</button>
            </div>
            <Comment upvoted={true} downvoted={false} replyTo={[21, "u/gege"]} replyToComment={replyToComment} inEditmode={true}/>
        </div>
    );
}

export default PostDetails;