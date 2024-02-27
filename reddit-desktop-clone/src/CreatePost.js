import React, {useState, useEffect, useRef} from 'react';
import { Form, useNavigate, useParams } from "react-router-dom";

import MDEditor from '@uiw/react-md-editor';
import { useInfn } from './Cache';

import './CSS/createPost.css';
import PostTypeSelector from './PostTypeSelector';
import Markdown_preview from './Markdown_preview';
import MediaPreview from './MediaPreview';


const CreatePost = ({toggleNavbar}) => {
    const sub_id = useParams();
    const navigate = useNavigate();
    const fromCache = useInfn();

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

    const media_post_request = async (url, type) => {
        const formData = new FormData();

        formData.append('media', selectedFile);
        formData.append('type', type);


        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            // Handle success response
            const responseData = await response.text();
            console.log(responseData);
            return responseData;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const after_media_post_request = (post_type, data, url) => {
        const post_data = {
            Post_Type: post_type.includes("video") ? "video_post" : "image_post",
            Title: title,
            Text: null,
            Image_Name: post_type.includes("image") ? data : null,
            Video_Name: post_type.includes("video") ? data : null,
            Link: null,
            User_Id: fromCache.userId,
            Posted_When: fromCache.getCurrentDate(),
            Sub_Id: parseInt(sub_id.id),
            Number_Of_Comments: 0,
            Number_of_Upvotes: 0,
            Number_Of_DownVotes: 0,
            Flair: [null]
        }
        console.log(JSON.strixngify(post_data));
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post_data),
        })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error uploading post: ', error));
    }

    const normie_post_request = (post_type, url) => {
        const post_data = {
            Post_Type: post_type,
            Title: title,
            Text: text,
            Image_Name: null,
            Video_Name: null,
            Link: null,
            User_Id: fromCache.userId,
            Posted_When: fromCache.getCurrentDate(),
            Sub_Id: sub_id.id,
            Number_Of_Comments: 0,
            Number_of_Upvotes: 0,
            Number_Of_DownVotes: 0,
            Flair: [null]
        }
        console.log(JSON.stringify(post_data));
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post_data),
        })
        .then(response => response.text())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error uploading post: ', error));
    }

    const submit = async() => {
        console.log(postType);
        const crt_post_url = 'https://localhost:7166/CRUD/CreatePost'
        if(postType === "imgVid"){
            const url = 'https://localhost:7166/CRUD/MediaSave'
            const type = selectedFile.type.includes('video') ? 'Video' : selectedFile.type.includes('image') ? 'Image' : null
            const data = await media_post_request(url, type);
            console.log(type);
            after_media_post_request(selectedFile.type, data, crt_post_url);
            closeCrt()
        }
        else if(postType === "post"){
            normie_post_request("text_post", crt_post_url)
            closeCrt()
        }
    }

    useEffect(() => {
        toggleNavbar(false);
        if(text.length > 0 && title.length > 0){
            setPostApproved1(true);
        }
        else{
            setPostApproved1(false);
        }
        if(fromCache.userId){
            console.log(fromCache.userId);

            if(postApproved1 && postApproved2){
                setPostBtnStyle({display: "flex"})
            }
            else if(postApproved2 && selectedFile){
                setPostBtnStyle({display: "flex"})
            }
        }
        else{
            setPostBtnStyle({display: "none"})
        }
    }, [text, title, postType, selectedFile, postApproved2, postApproved2]);

    const closeCrt = () => {
        navigate(-1);
    }

    return (
        <div className="create_post"  data-color-mode="dark">
            <div className="crt_close" onClick={() => closeCrt()}>
                <span className="material-symbols-outlined">arrow_back</span>
                <h4>Back</h4>
            </div>  

            <div className="post_title">
                <h3>Create Post</h3>
                <hr />
            </div>
            <div className="submit_cont"> 
                {/* <div className="choose_community">
                    <span className="material-symbols-outlined">search</span> 
                    <input type="text" placeholder="Choose a Community"/>
                    <span className="material-symbols-outlined">expand_more</span>
                </div> */}
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