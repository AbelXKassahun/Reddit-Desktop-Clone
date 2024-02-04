import {useEffect, useState} from 'react';
import './CSS/media_preview.css';
import VideoComponent from './VideoComponent';
import ImageComponent from './ImageComponent';

const MediaPreview = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);
    const [fileType, setFileType] = useState(null);

    const [previewStyle, setPreviewStyle] = useState({display: "none"})
    const [initailStyle, setInitialStyle] = useState({display: "flex"})

    const [goBack, setGoBack] = useState(false)


    const handleFileChange = (e) => { 
        const file = e.target.files[0];
        console.log(file.type);

        if (file) {
            // Check file type
            const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/webm', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                fileType === "image" && setError('Invalid file type. Please select a .jpg, .png, .gif file.');
                fileType === "video" && setError('Invalid file type. Please select a .mp4, .webm file.');
                return;
            }

            // Check file size (1MB limit in this example)
            const maxImgSize = 100 * 1024 * 1024; // 100MB
            const maxVidSize = 150 * 1024 * 1024; // 150MB

            if (fileType == "image" && file.size > maxImgSize) {
                setError('Image size exceeds the limit (100MB). Please choose a smaller image.');
                return;
            }
            else if (fileType == "video" && file.size > maxVidSize) {
                setError('Video size exceeds the limit (150MB). Please choose a smaller video.');
                return;
            }
            console.log(error);
            // Set the selected file and preview URL
            setSelectedFile(file);
            // if (file.type.startsWith('image/')) {
            //     const reader = new FileReader();
            //     reader.onloadend = () => {
            //         setPreviewUrl(reader.result);
            //     };
            //     reader.readAsDataURL(file);
            // }
            // else if(type == "video"){
            //     const videoPreviewUrl = URL.createObjectURL(file);
            //     setPreviewUrl(videoPreviewUrl);
            // }
            // // preview URL for images
            const PreviewUrl = URL.createObjectURL(file);
            setPreviewUrl(PreviewUrl);
            console.log("AAAAA", PreviewUrl);
            console.log("BBBBB", previewUrl);
            console.log("CCCCC", selectedFile);
            changeStyle();
        }
        e.target.value = null; 
    }

    const changeStyle = () => {
        if(goBack){
            setInitialStyle({display: "flex"});
            setPreviewStyle({display: "none"});
            setGoBack(false);
            setSelectedFile(null);
            setPreviewUrl(null);
        }
        else{
            setInitialStyle({display: "none"});
            setPreviewStyle({display: "flex"});
            setGoBack(true);
        }
    }

    const handleSubmit = () => {
        // post request
    };

    return (
        <>
            <div className="upload_inital" style={initailStyle}>
                <h4>Upload your </h4>
                <div className="label_container">
                    <label htmlFor="imgFileInput" onClick={() => setFileType("image")}>Image(s)</label>
                    <input id="imgFileInput" type="file" accept=".jpg, .png, .gif" onInput={(e) => handleFileChange(e)} style={{ display: 'none' }}/>
                </div>
                <h4> or your </h4>
                <div className="label_container">
                    <label htmlFor="vidFileInput" onClick={() => setFileType("video")}>Video</label>
                    <input id="vidFileInput" type="file" accept=".mp4, .webm " onInput={(e) => handleFileChange(e)} style={{ display: 'none' }}/>
                </div>
            </div>
            <div className="media_preview" style={previewStyle}>
                <button onClick={() => changeStyle()}><span className="material-symbols-outlined">arrow_back</span></button>
                {fileType === "image" && previewUrl && <ImageComponent url = {previewUrl}/>}
                {fileType === "video" && previewUrl && selectedFile && <VideoComponent url = {previewUrl} type={selectedFile.type}/>}
            </div>
        </>
    );
}

export default MediaPreview;