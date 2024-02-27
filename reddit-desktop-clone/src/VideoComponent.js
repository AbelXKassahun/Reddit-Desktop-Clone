import React from 'react';
import "./CSS/VideoComponent.css";
import useMediaFetch from './Custom Hook/useMediaFetch.js';
import ReactPlayer from 'react-player'

const VideoComponent = ({url}) => {

    return (
        // <video controls>
        //     <source src={src} type='video/mp4'></source>
        // </video>

        <ReactPlayer url={url} controls={true} width="530px" height="300px" pip={true}/>
    );
}

export default VideoComponent;