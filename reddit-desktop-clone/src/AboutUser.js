import { useState, useEffect } from 'react';
import './CSS/aboutUser.css'
import { useInfn } from './Cache'
import ppf from './Assets/user_default.png'

const AboutUser = ({user_id}) => {
    // initial api call for about user
    const [userInfo, setUserInfo] = useState(null)
    useEffect(() => {
        console.log(user_id);
        if(user_id.id !== null){
            const url_dotnet = `https://localhost:7166/User/GetUserInfo?Id=${user_id}`
            fetch(url_dotnet)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserInfo(data)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
    }, [user_id]);
    return (
        <>
            {user_id && userInfo && (
                <div className="aboutUser">
                    <div className="topContent">
                        <div className="img_cont">
                            <img src={ppf} alt="" />
                        </div>
                        <div className="uInfn">
                            <p>u/{userInfo.userName}</p>
                            <p>{userInfo.email}</p>
                        </div>
                    </div>

                    <div className="descr">
                        {userInfo.description && (
                            <p>{userInfo.description}</p>
                        )}
                        {!userInfo.description && (
                            <p>No description yet</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default AboutUser;