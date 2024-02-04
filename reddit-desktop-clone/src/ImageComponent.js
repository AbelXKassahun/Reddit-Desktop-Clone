import React, {useState, useEffect} from 'react';
import './CSS/ImageComponent.css';
import useMediaFetch from './Custom Hook/useMediaFetch.js';


const ImageComponent = (props) => {
    
    // const image_name = props.image_name;
    // const url = `https://localhost:7155/Media/GetImage?image_path=${image_name}`
    // const {mediaUrl, isPending, error} = useMediaFetch(url);

    return (
        <div className="imageComponent">
            {/* {mediaUrl && (
                <img src={mediaUrl} alt="Friend" />
            )} */}
            {/*isPending && <img src = "./src/Assets/Loading.jpg"/>*/}
            {/*error && <img src = "./src/Assets/error.jpg"/>*/}
            <img src={props.url} alt=""  />
        </div>
    );
}

export default ImageComponent;