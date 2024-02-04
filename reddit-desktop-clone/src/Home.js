import React from 'react'
import './CSS/home.css'
import useFetch from './Custom Hook/useFetch';
import Post from './post';
import VideoComponent from './VideoComponent';
import CreatePost from './CreatePost';

const Home = () => {
    const url_dotnet = "https://localhost:7155/Home/getPosts";
    const url_jsonServer = "http://localhost:8000/posts";
    const {data: posts, isPending, error} = useFetch(url_jsonServer);

    return (
        // <div className="home">
        //     {/* <ImageComponent image_path = "messi.jpg"/> */}
        //     {/* <VideoComponent video_path = "arsenal.mp4"/> */}
        //     { error && <div>{ error }</div> }
        //     { isPending && <div>Loading....</div> }
        //     {
        //         posts && 
        //         (posts.map((post) => (
        //             <Post post = {post} key = {post.post_id} />
        //         )))
        //     }
        //     <p>Copyright</p>
        // </div>
        <div className="home">
            <CreatePost/>
        </div>
    );
}

export default Home;