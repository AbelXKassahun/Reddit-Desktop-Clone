import {useState} from 'react';
import './CSS/postTypeSelector.css';

const PostTypeSelector = ({ changePostType, post_approve2 }) => {
    const defaultStyle = {
        display: "flex"
    }

    const [post, setPost] = useState({
        borderBottom: "1px solid #fff"
    })
    const [imgVid, setImgVid] = useState(defaultStyle)
    const [link, setLink] = useState(defaultStyle)



    const changeStyle = (btn) => {
        const newStyle = {
            borderBottom: "1px solid #fff"
        }
        if(btn === "post"){
            setPost(newStyle)
            setLink(defaultStyle)
            setImgVid(defaultStyle)
        }
        else if(btn === "link"){
            setLink(newStyle)
            setPost(defaultStyle)
            setImgVid(defaultStyle)
        }
        else{
            setImgVid(newStyle)
            setLink(defaultStyle)
            setPost(defaultStyle)
        }
        changePostType(btn);
        post_approve2(false);
    }

    return (
        <div className="post_type_selector">
            <button onClick={() => changeStyle("post")} style={post} className="text_post" ><span className="material-symbols-outlined">feed</span>Post</button>
            <button onClick={() => changeStyle("link")} style={link} className="link_post" ><span className="material-symbols-outlined">link</span>Link</button>
            <button onClick={() => changeStyle("imgVid")} style={imgVid} className="media_post" ><span className="material-symbols-outlined">image</span>Image or Video</button>
        </div>
    );
}

export default PostTypeSelector;