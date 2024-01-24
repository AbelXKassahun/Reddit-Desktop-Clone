import React, {useEffect, useState} from 'react';
import "./CSS/VideoComponent.css";
import useMediaFetch from './Custom Hook/useMediaFetch.js';

const VideoComponent = (props) => {
    // const video_name = props.video_name
    const video_name = "arsenal.mp4"
    const url = `https://localhost:7155/Media/GetVideo?video_path=${video_name}`
    const {mediaUrl, isPending, error} = useMediaFetch(url);

    return (
        <div className="videoComponent">
            {mediaUrl && (
                <video width="640" height="360" controls>
                    <source src={mediaUrl} type="video/mp4"></source>
                </video>
            )}
            {/*isPending && <img src = "./src/Assets/Loading.jpg"/>*/}
            {/*error && <img src = "./src/Assets/Error.jpg"/>*/}
        </div>  
    );
}

export default VideoComponent;