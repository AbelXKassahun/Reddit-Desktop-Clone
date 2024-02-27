import React, { useState, useEffect } from 'react'
import './CSS/home.css'
import useFetch from './Custom Hook/useFetch';
import Post from './post';
import Toggle_Feed from './Toggle_Feed';
import { useNavigate } from 'react-router-dom';
import { useInfn } from './Cache'


const Home = ({toggleNavbar}) => {
    const navigate = useNavigate();
    const fromCache = useInfn();

    const [chosenSort, setChosenSort] = useState("hot")
    const [chosenTime, setChosenTime] = useState("This Day")    

    // const [url, setUrl] = useState(null);

    const [posts, setPosts] = useState(null)



    const handleChosenSort = (val) => {
        setChosenSort(val)
    }

    const handleChosenTime = (val) => {
        setChosenTime(val)
    }

    useEffect(() => {
        toggleNavbar(false);
        console.log(fromCache);
        // check from the cache that the user is logged in
            if(chosenSort === "top" || chosenSort === "controversial"){
                if(chosenTime){
                    const url = chosenSort === "top" ? `GetTopPost?when=${chosenTime}&Id=${fromCache.userId}`: `GetControversialPost?when=${chosenTime}&Id=${fromCache.userId}`
                    const url_dotnet = 'https://localhost:7166/Post/' + url;
                    // make an api call
                    fetch(url_dotnet)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        setPosts(data['$values'])
                        console.log(data['$values']);
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
                    // setChosenTime("Today")
                }
            }
            else{
                console.log(fromCache);
                const url = chosenSort === "hot" ? `GetHotPost?Id=${fromCache.userId}`: `GetNewPost?Id=${fromCache.userId}`
                const url_dotnet = 'https://localhost:7166/Post/' + url;
                // make an api call
                fetch(url_dotnet)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setPosts(data['$values'])
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });            
            }
    

    },[chosenTime, chosenSort, fromCache.userId])


    const handleCreatePost = () => {
        navigate('/create_post')
        // fromCache.demo()
    }

    return (
        <div className="home">
            {/* <div className="home_create_post" onClick={() => handleCreatePost()}>
                <input type="text" name="" id="" placeholder='Create a post' onClick={() => handleCreatePost()}/>
            </div> */}
            <Toggle_Feed chosenTime={chosenTime} setChosenSort={handleChosenSort} setChosenTime={handleChosenTime}/>
            {
                posts && 
                (posts.map((post) => (
                    <Post post = {post} key = {post.post_Id} isInProfile={false}/>
                )))
            }
            <p>Copyright</p>
        </div>
    );
}

export default Home;