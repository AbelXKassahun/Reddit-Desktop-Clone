import {useState, useEffect} from 'react';
import MDEditor from '@uiw/react-md-editor';
import './CSS/markdown_preview.css';

const Markdown_preview = ({handleTextChange, post_approve2}) => {
    const [value, setValue] = useState("**Enter text here**");

    useEffect(() => {
        if(value !== "**Enter text here**" && value.length > 0){
            handleTextChange(value);
            post_approve2(true);
        }
        else{
            post_approve2(false);
        }
    }, [value]);



    return (
        <div className="optionsAndpreview">
            {/* <div className="markdown_options">
                <button title= "Bold" className="option1" onClick={() => applyFormatting("bold")}><span className="material-symbols-outlined">format_bold</span></button>
                <button title= "Italic" className="option2" onClick={() => applyFormatting("italic")}><span className="material-symbols-outlined">format_italic</span></button>
                <button title= "Shorten a link" className="option2" onClick={() => applyFormatting("link")}><span className="material-symbols-outlined">http</span></button>
                <button title= "Inline Code" className="option2" onClick={() => applyFormatting("inline_code")}><span className="material-symbols-outlined">code</span></button>
                <button title= "Header" className="option2" onClick={() => applyFormatting("header")}><span class="material-symbols-outlined">title</span></button>
                <button title= "Bulleted List" className="option2" onClick={() => applyFormatting("bulleted_list")}><span className="material-symbols-outlined">format_list_bulleted</span></button>
                <button title= "Numbered List" className="option2" onClick={() => applyFormatting("numbered_list")}><span className="material-symbols-outlined">format_list_numbered</span></button>
                <button title= "Quote Block" className="option2" onClick={() => applyFormatting("quote_block")}><span className="material-symbols-outlined">format_quote</span></button>
            </div> */}
            <div className="markdown_preview" data-color-mode="dark">
                <MDEditor
                    value={value}
                    onChange={setValue}
                    highlightEnable={false}
                />
                {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
            </div>
        </div>
    );
}
// data-color-mode="dark"
export default Markdown_preview;