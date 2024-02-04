import React from 'react';
import "./CSS/VideoComponent.css";
import useMediaFetch from './Custom Hook/useMediaFetch.js';

const VideoComponent = (props) => {
    // const video_name = props.video_name
    // const video_name = "arsenal.mp4"
    // const url = `https://localhost:7155/Media/GetVideo?video_path=${video_name}`
    // const {mediaUrl, isPending, error} = useMediaFetch(url);
    // const buf = props.url.arrayBuffer();
    // const src = URL.createObjectURL( new Blob( [ buf ] ) );
    return (
        <video controls>
            <source src={props.url} type={props.type}></source>
        </video>
    );
}

export default VideoComponent;