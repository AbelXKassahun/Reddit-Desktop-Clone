import React, {useState, useEffect, useRef} from 'react';

import './CSS/createPost.css';
import PostTypeSelector from './PostTypeSelector';
import Markdown_preview from './Markdown_preview';
import MediaPreview from './MediaPreview';


const CreatePost = () => {
    const [text, setText] = useState('Text (Optional)');

    const [postType, setPostType] = useState('initial');


    const changePostType = (type) => {
        setPostType(type)
    }

    const handleTextSelection = () => {
        const selectedText = window.getSelection().toString();
        if(selectedText && selectedText.length > 0){
            const range = window.getSelection().getRangeAt(0);
            console.log('Selected text:', selectedText);
            // console.log(range);
            return selectedText;
        }
    }

    const applyFormatting = (type) => {
        // const newText = `${text.slice(0, selectedRange.start)}<${style}>${text.slice(
        //     selectedRange.start,
        //     selectedRange.end
        // )}</${style}>${text.slice(selectedRange.end)}`;

        const selected = handleTextSelection();
        const newText = type == "bold" ?`**${selected}**` : type == "italic" ? `*${selected}*` : ''
        
        // const editor = document.querySelector(".markdown_editor");
        // // editor.textContent = ''
        // console.log(editor.textContent);
        setText(newText);
    };




    const submit = () => {

    }
    return (
        <div className="create_post">
            <div className="post_title">
                <h3 onSelect={handleTextSelection}>Create Post</h3>
                <hr />
            </div>
            <div className="submit_cont"> 
                <div className="choose_community">
                    <span className="material-symbols-outlined">search</span> {/* this will change to a subreddit or a user icon once the user chooses where to post*/}
                    <input type="text" placeholder="Choose a Community"/>
                    <span className="material-symbols-outlined">expand_more</span>
                </div>
                <div className="main_container">

                    <PostTypeSelector changePostType = {changePostType}/>

                    <div className="title_and_preview">
                        <div className="title">
                            <input type="text" placeholder="Title" />
                        </div>
                        <div className="content_editor">
                            {postType == "post" && <Markdown_preview text = {text} handleTextSelection = {handleTextSelection} applyFormatting = {applyFormatting}/>}
                            {postType == "imgVid" && <MediaPreview/>}
                        </div>
                    </div>
                    <div className="flair_and_tag">
                        <button className="OC"><span className="material-symbols-outlined">sell</span> OC</button>
                        <button className="spoiler"><span className="material-symbols-outlined">sell</span> Spoiler</button>
                        <button className="NSFW"><span className="material-symbols-outlined">sell</span> NSFW</button>
                        <button className="NSFW"><span className="material-symbols-outlined">sell</span> Flair <span className="material-symbols-outlined">expand_more</span></button>

                    </div>
                    <div className="submit_container">
                        <hr />
                        <button onClick={() => { submit() }}>Post</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreatePost;