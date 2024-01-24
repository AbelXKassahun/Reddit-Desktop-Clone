import ImageComponent from './ImageComponent';
import VideoComponent from './VideoComponent';
import { Link } from 'react-router-dom';
import "./CSS/Post.css";

const Post = (props) => {
    const post = props.post
    return (
        <div className="post" as={Link} to="/">
            <div className="post_rating">
                <div className="upvote">
                    <button className="upvote_btn"><img src="" alt="" /></button>
                    <span>{post.upvotes}</span>
                </div>
                <div className="downvote">
                    <button className="downvote"><img src="" alt="" /></button>
                    <span>{post.upvotes}</span>
                </div>
            </div>
            <div className="right_section">
                <div className="post_infn">
                    <Link to="/"><img src="" alt="" /></Link>{/*you need to pass the subreddit id as a query parameter */}
                    <Link to="/">{post.posted_where}</Link>{/*you need to the subreddit id as a query parameter */}
                    <span>Posted by </span>
                    <Link to="/">{post.posted_by}</Link>{/*you need to pass the user id as a query parameter */}
                    <span>{post.posted_when}</span>
                </div>
                <div className="actual_post">
                    <div className="post_title">
                        <h3>{ post.title }</h3>
                    </div>
                    {post.post_type === "image_post" && <ImageComponent image_name = {post.image_name}/>}
                    {post.post_type === "video_post" && <VideoComponent video_name = {post.video_name}/>}
                    {/* {post.post_type === "text_post" && <NormalPostComponent text_content = {post.text}/>} */}
                    {/* {post.post_type === "link_post" && <LinkPostComponent link = {post.link}/>} */}
                    {post.post_type === "text_post" && <span>{post.text}</span>}
                </div>
                <div className="comment_save">
                    <Link className="comment" to="/"><img src="" alt="" /><span>{post.number_of_comments} Comments</span></Link>
                    <button className="save"><img src="" alt="" />Save</button>
                </div>
            </div>
        </div>
    );
}

export default Post;