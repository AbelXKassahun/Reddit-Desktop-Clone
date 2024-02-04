import {useRef} from 'react';
import Markdown from 'react-markdown';
// import remarkGfm from 'remark-gfm'
import './CSS/markdown_preview.css';

const Markdown_preview = ({text, handleTextSelection, applyFormatting}) => {
    const divRef = useRef(null);

    const handleClick = () => {
        if(divRef.current){
            document.execCommand('selectAll', false, null);
        }
        // the below code also works
        // document.execCommand('selectAll', false, null);
    }

    return (
        <div className="optionsAndpreview">
            <div className="markdown_options">
                <button title= "Bold" className="option1" onClick={() => applyFormatting("bold")}><span className="material-symbols-outlined">format_bold</span></button>
                <button title= "Italic" className="option2" onClick={() => applyFormatting("italic")}><span className="material-symbols-outlined">format_italic</span></button>
                <button title= "Shorten a link" className="option2" onClick={() => applyFormatting("link")}><span className="material-symbols-outlined">http</span></button>
                <button title= "Inline Code" className="option2" onClick={() => applyFormatting("inline_code")}><span className="material-symbols-outlined">code</span></button>
                <button title= "Header" className="option2" onClick={() => applyFormatting("header")}><span class="material-symbols-outlined">title</span></button>
                <button title= "Bulleted List" className="option2" onClick={() => applyFormatting("bulleted_list")}><span className="material-symbols-outlined">format_list_bulleted</span></button>
                <button title= "Numbered List" className="option2" onClick={() => applyFormatting("numbered_list")}><span className="material-symbols-outlined">format_list_numbered</span></button>
                <button title= "Quote Block" className="option2" onClick={() => applyFormatting("quote_block")}><span className="material-symbols-outlined">format_quote</span></button>
            </div>
            <div className="markdown_preview" >
                <div ref={divRef} className="markdown_editor"  contentEditable={true} 
                    onSelect={handleTextSelection}
                    // onChange={handleTextChange}
                    onClick={handleClick}
                >
                    <Markdown>{text}</Markdown>
                </div>
            </div>
        </div>
    );
}
// data-color-mode="dark"
export default Markdown_preview;