import React, {useState, useEffect, useRef} from 'react';
import MDEditor from '@uiw/react-md-editor';

import './CSS/createPost.css';
import PostTypeSelector from './PostTypeSelector';
import Markdown_preview from './Markdown_preview';
import MediaPreview from './MediaPreview';


const CreatePost = () => {
    const [text, setText] = useState("");

    const [title, setTitle] = useState("");

    const [postType, setPostType] = useState('post');

    const [selectedFile, setSelectedFile] = useState(null);

    const [flair, setFlair] = useState(null);

    const [postBtnStyle, setPostBtnStyle] = useState({display: "none"});

    const [postApproved1, setPostApproved1] = useState(false);
    const [postApproved2, setPostApproved2] = useState(false);

    const handleTextChange = (val) => {
        setText(val)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const post_approve2 = (val) => {
        setPostApproved2(val)
    }

    const apply_flair = (new_flair) => {
        const filtered_flair = flair.filter(a => a !== new_flair);
        if(filtered_flair.length == flair.length){
            filtered_flair.push(new_flair)
            setFlair(filtered_flair);
        }
        else{
            setFlair(filtered_flair)
        }
    }

    const changeMediaFile = (file) => {
        setSelectedFile(file);
    }

    const getMediaFile = () => {
        return selectedFile;
    }

    const changePostType = (type) => {
        setPostType(type);
    }

    const media_post_request = () => {
        const formData = new FormData();

        formData.append('videoFile', selectedFile);

        fetch('', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error uploading post: ', error));
    }

    const after_media_post_request = (post_type, data) => {
        const post_data = {
            post_type: post_type.include("video") ? "video_post" : "image_post",
            title: title,
            text: null,
            image_name: post_type.include("image") ? data.media_name : null,
            video_name: post_type.include("video") ? data.media_name : null,
            link: null,
            flair: flair
        }
        fetch('', {
            method: 'POST',
            header: {
                "content-type": "application/json",
            },
            body: post_data,
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error uploading post: ', error));
    }

    const normie_post_request = (post_type) => {
        const post_data = {
            post_type: post_type,
            title: title,
            text: text,
            image_name: null,
            video_name: null,
            // link: ,
            flair: flair
        }
        fetch('', {
            method: 'POST',
            header: {
                "content-type": "application/json",
            },
            body: post_data,
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error uploading post: ', error));
    }

    const submit = () => {
        if(postType === "imgVid"){
            const data = media_post_request();
            after_media_post_request(selectedFile.type, data);
        }
        else{
            normie_post_request(postType)
        }
    }

    useEffect(() => {
        if(text.length > 0 && title.length > 0){
            setPostApproved1(true);
        }
        else{
            setPostApproved1(false);
        }

        if(postApproved1 && postApproved2){
            setPostBtnStyle({display: "flex"})
        }
        else if(postApproved2 && selectedFile){
            setPostBtnStyle({display: "flex"})
        }
        else{
            setPostBtnStyle({display: "none"})
        }
    }, [text, title, postType, selectedFile]);

    return (
        <div className="create_post"  data-color-mode="dark">
            <div className='pp'>
                <MDEditor.Markdown source={text} />
            </div>
            <div className="post_title">
                <h3>Create Post</h3>
                <hr />
            </div>
            <div className="submit_cont"> 
                <div className="choose_community">
                    <span className="material-symbols-outlined">search</span> {/* this will change to a subreddit or a user icon once the user chooses where to post 5*/}
                    <input type="text" placeholder="Choose a Community"/>
                    <span className="material-symbols-outlined">expand_more</span>
                </div>
                <div className="main_container">
                    <PostTypeSelector changePostType = {changePostType} post_approve2={post_approve2}/>
                    <div className="title_and_preview">
                        <div className="title">
                            <input className="title" type="text" placeholder="Title" value={title} onChange={handleTitleChange}/>
                        </div>
                        <div className="content_editor">
                            {postType === "post" && <Markdown_preview handleTextChange = {handleTextChange} post_approve2={post_approve2}/>}
                            {postType === "imgVid" && <MediaPreview changeMediaFile = {changeMediaFile} getMediaFile={getMediaFile} post_approve2={post_approve2}/>}
                        </div>
                    </div>
                    <div className="flair_and_tag">
                        <button className="OC" onClick={() => apply_flair("OC")}><span className="material-symbols-outlined">sell</span> OC</button>
                        <button className="spoiler" onClick={() => apply_flair("Spoiler")}><span className="material-symbols-outlined">sell</span> Spoiler</button>
                        <button className="NSFW" onClick={() => apply_flair("NSFW")}><span className="material-symbols-outlined">sell</span> NSFW</button>
                        <button className="NSFW" ><span className="material-symbols-outlined">sell</span> Flair <span className="material-symbols-outlined">expand_more</span></button>
                    </div>
                    <div className="submit_container">
                        <hr />
                        <button style = {postBtnStyle} onClick={() => { submit() }}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;