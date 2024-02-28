import { Form, useNavigate, useParams } from "react-router-dom";
import {useState, useEffect, useRef} from 'react';
import './CSS/subreddit.css';
import useFetch from './Custom Hook/useFetch';
import Post from './post';
import { useInfn } from './Cache';
import bkg from './Assets/bkg.png'

const Subreddit = ({toggleNavbar}) => {
    const [join, setJoin] = useState('Join')
    const [isSticky, setIsSticky] = useState(false);

    const sub_id = useParams();
    const navigate = useNavigate();

    const fromCache = useInfn();

    const [subIconUrl, setSubIconUrl] =useState(null)
    const [subBkdUrl, setSubBkdUrl] =useState(null)

    // api call retrieve sub info using sub_id from useParams
    // api call to retrieve sub posts using sub_id from useParamas

    const [subInfo, setSubInfo] = useState(null)
    const [posts, setPosts] = useState(null)

    const handleScroll = ()  => {
        if (window.scrollY > 390) {
            setIsSticky(true);
        } 
        else {
            setIsSticky(false);
        }
    }   

    useEffect(() => {
        toggleNavbar(false);
        console.log(sub_id.id);
        if(sub_id.id){
            const url_dotnet = `https://localhost:7166/Subreddit/GetSubInfo?subredditId=${sub_id.id}`
            fetch(url_dotnet)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSubInfo(data)
                console.log(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }

        window.addEventListener('scroll', handleScroll);

        // check the state of join
        return () => {
            window.removeEventListener('scroll', handleScroll);
            setSubInfo(null)
            setSubBkdUrl(null)
        };
    }, [sub_id.id])

    const isMounted = useRef(false)

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true
        }
        else{
            const url_dotnet = `https://localhost:7166/Post/GetSubPosts?Sub_Id=${sub_id.id}&filter=${'top'}&filterwithdate=${'This Year'}&Id=${fromCache.userId}`
            fetch(url_dotnet)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPosts(data["$values"])
                console.log(data["$values"]);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

            //////////////////////////////////////////////////////
            if(subInfo){
                const url_icon = `https://localhost:7166/CRUD/GetImage?image_path=${subInfo.sub_IconImg_Name}`;
                fetch(url_icon)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const objectURL = URL.createObjectURL(blob);
                    setSubIconUrl(objectURL)
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
    
                const url_bkd = `https://localhost:7166/CRUD/GetImage?image_path=${subInfo.sub_BackgroundImg_Name}`;
                // const url_bkd = `https://localhost:7166/CRUD/GetImage?image_path=${"9eb8e596-56b4-405d-9435-265b0130b19d_defaultSubBackgroundImage.png"}`;

                fetch(url_bkd)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob();
                })
                .then(blob => {
                    let objectURL = URL.createObjectURL(blob);
                    console.log('aint no wayt');
                    setSubBkdUrl(objectURL)
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });

                // check if the user has joined the subreddit or not
            }
        }
        // return () => {
        //     setSubInfo(null)
        //     setSubBkdUrl(null)
        // };
    }, [subInfo])



    const handle_join = () => {
        if(fromCache.loggedIn){
            setJoin(join === 'Join' ? 'Leave' : 'Join');
            // make an api call (join/ unjoin)
    
            const val = {
                User_Id: fromCache.userId,
                sub_id: sub_id.id
            }
            const url_join = `https://localhost:7166/Subreddit/`;
            const offset = join === 'Join' ? 'JoinSubreddit' : 'LeaveSubreddit'
            fetch(url_join + offset,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(val)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
        else{
            navigate('/login');
        }

    }

    const handle_create = () => {
        if(fromCache.loggedIn){
            navigate(`/create_post/${sub_id.id}`)
        }
        else{
            navigate('/login');
        }
    }

    const closeSub = () => {
        navigate(-1);
    }



    return (
        <>
            { subBkdUrl && subIconUrl &&         
                (<div className="sub_page">
                    <div className="sub_close" onClick={() => closeSub()}>
                        <span className="material-symbols-outlined">arrow_back</span>
                        <h4>Back</h4>
                    </div>  
                    <div className="top_sub">
                        <div className="sub_bkImg">
                            <img src={bkg} alt="" />
                        </div>
                        <div className="sub_info">
                            <div className="sub_img_small">
                                <img src={subIconUrl} alt="" />
                            </div>
                            <div className="sub_name">
                                <h2>r/{subInfo.subreddit_Name}</h2>
                                <p>{subInfo.subreddit_Alt_Name}</p>
                            </div>
                            <div className="join_create">
                                <button className="create_post_onSub" onClick={() => handle_create(1)}>Create a post</button>
                                <button className="join_sub" onClick={() => handle_join()}>{join}</button>
                            </div>
                        </div>
                    </div>
                    <div className="sub_content_container">
                        <div className="content_cont">
                            {
                                posts && 
                                (posts.map((post) => (
                                    <Post post = {post} key = {post.post_Id} />
                                )))
                            }
                            <p>Copyright</p>
                        </div>
                        <div className={`sub_description ${isSticky ? 'sub_fixed' : ''}`}>
                            <h4>r/{subInfo.subreddit_Name}</h4>
                            <p>{subInfo.subreddit_Description} </p>
                        </div>
                    </div>
                </div>)
            }
        </>

    );
}

export default Subreddit;