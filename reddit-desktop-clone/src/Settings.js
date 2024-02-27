import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import './CSS/settings.css';
import { useInfn } from './Cache';


const Settings = ({user_id, username, email}) => {
    const [newUsername, setNewUsername] = useState('New Username');
    const [newEmail, setNewEmail] = useState('New Email');
    const [newPassword, setNewPassword] = useState('New Password');
    const [description, setDescription] = useState('Description (Optional)')

    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    const [error3, setError3] = useState('');
    const [error4, setError4] = useState('');

    const [error1Style, setError1Style] = useState({display: 'none'});
    const [error2Style, setError2Style] = useState({display: 'none'});
    const [error3Style, setError3Style] = useState({display: 'none'});
    const [error4Style, setError4Style] = useState({display: 'none'});


    const [newUsernameStyle, setNewUsernameStyle] = useState({display: "none"});
    const [newEmailStyle, setNewEmailStyle] = useState({display: "none"});
    const [newPasswordStyle, setNewPasswordStyle] = useState({display: "none"});
    const [descriptionStyle, setDescriptionStyle] = useState({display: "none"})


    const [b1Style, setB1Style] = useState({display: "flex"});
    const [b2Style, setB2Style] = useState({display: "flex"});
    const [b3Style, setB3Style] = useState({display: "flex"});
    const [b4Style, setB4Style] = useState({display: "flex"});

    const fromCache = useInfn();
    const navigate = useNavigate();

    
    const handleFocus = (event) => {
        event.target.select();
    };

    const changeBtn = (e) => {
        const name = e.target.name;
        if(name === 'username'){
            setNewUsernameStyle({display: "flex"})
            setNewEmailStyle({display: "none"})
            setNewPasswordStyle({display: "none"})
            setB1Style({display: "none"})
            setB2Style({display: "flex"})
            setB3Style({display: "flex"})
        }
        else if (name === 'email'){
            setNewEmailStyle({display: "flex"})
            setNewUsernameStyle({display: "none"})
            setNewPasswordStyle({display: "none"})
            setB1Style({display: "flex"})
            setB2Style({display: "none"})
            setB3Style({display: "flex"})
        }
        else if (name === 'password'){
            setNewPasswordStyle({display: "flex"})
            setNewEmailStyle({display: "none"})
            setNewUsernameStyle({display: "none"})
            setB1Style({display: "flex"})
            setB2Style({display: "flex"})
            setB3Style({display: "none"})
        }
        else{
            setDescriptionStyle({display: "flex"})
            setNewPasswordStyle({display: "none"})
            setNewEmailStyle({display: "none"})
            setNewUsernameStyle({display: "none"})
            setB1Style({display: "flex"})
            setB2Style({display: "flex"})
            setB3Style({display: "flex"})
            setB4Style({display: "none"})
        }
    }

    const cancelBtn = (e) => {
        const name = e.target.name;
        if(name === 'username'){
            setNewUsernameStyle({display: "none"})
            setB1Style({display: "flex"})
        }
        else if (name === 'email'){
            setNewEmailStyle({display: "none"})
            setB2Style({display: "flex"})
        }
        else if (name === 'password'){
            setNewPasswordStyle({display: "none"})
            setB3Style({display: "flex"})
        }
        else{
            setDescriptionStyle({display: "none"})
            setB4Style({display: "flex"})
        }
    }

    const updateProfile = (e) => {
        const name = e.target.name;
        if(name == 'username'){
            if(usernameCheck()){
                // make an api call
                setNewUsernameStyle({display: "none"});
                setB1Style({display: "flex"})
                console.log('username checks out');
            }
        }
        else if (name === 'email'){
            if(emailCheck()){
                // make an api call
                setNewEmailStyle({display: "none"});
                setB2Style({display: "flex"})
                console.log("email checks out");
            }
        }
        else if (name === 'password'){
            if(passwordCheck()){
                // make an api call
                setNewPasswordStyle({display: "none"});
                setB3Style({display: "flex"})
                console.log("password checks out");
            }
        }   
        else{
            if(description){
                // make an api call
                setDescriptionStyle({display: "none"});
                setB4Style({display: "flex"})
                console.log("description checks out");
            }
        }
    }



    const usernameCheck = () => {
        const notAlphaNumbericRegex = /[^\w]/;
        const containsSymbolAndSpaces = notAlphaNumbericRegex.test(newUsername);

        if(newUsername.length < 6){
            setError1Style({display: 'flex'})
            if(containsSymbolAndSpaces){
                setError1("Username too short --- Symbols and Whitespaces aren't allowed in Usernames");
                return false;
            }
            else{
                if(newUsername.length == 0){
                    setError1("Username can't be empty");
                    return false;
                }
                else{
                    setError1("Username too short");
                    return false;
                }
            }
        }
        else{
            if(containsSymbolAndSpaces){
                setError1Style({display: 'flex'});
                setError1("Symbols and Whitespaces aren't allowed in usernames");
                return false;
            }
            else{
                setError1Style({display: 'none'});
                setError1('');
                return true
            }
        }
    }

    const emailCheck = () => {
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailRegex = /[A-Za-z0-9_]+@gmail\.com/i;
        const isCorrectEmail = emailRegex.test(newEmail);
        const spaceRegex = /\s/;
        const containsSpace = spaceRegex.test(newEmail);

        if(!isCorrectEmail && newEmail.length > 10){
            setError2Style({display: 'flex'});
            setError2("Invalid email format");
            return false;
        }
        else{
            if(!containsSpace){
                setError2Style({display: 'none'});
                setError2('');
                return true;
            }
            else{
                setError2Style({display: 'flex'});
                setError2("Invalid email format");
                return false;
            }
        }
    }

    const passwordCheck = () => {
        const spaceRegex = /\s/;
        const containsSpace = spaceRegex.test(newPassword);

        if(newPassword.length < 8){
            setError3Style({display: 'flex'})
            if(containsSpace){
                setError3("Password is atleast 8 Characters -- Whitespaces aren't allowed in passwords")
                return false;
            }
            else{
                if(newPassword.length == 0){
                    setError3("Password can't be empty");
                    return false;
                }
                else{
                    setError3("Password is atleast 8 Characters");
                    return false;
                }
            }
        }
        else{
            if(containsSpace){
                setError3Style({display: 'flex'});
                setError3("Whitespaces aren't allowed in passwords");
                return false;
            }
            else{
                setError3Style({display: 'none'});
                setError3('');
                return true;
            }
        }
    }

    const deleteAcc = () => {
        fromCache.logout();
        // api call to delete account
        navigate('/');
    }

    const logout = () => {
        fromCache.logout();
        navigate('/');
    }


    return (
        <div className="userSettings">
            <div className="settingsTitle">
                <h2>Account Settings</h2>
                <hr />
            </div>

            <div className="settingsBody">
                <div className="userInfoChange">
                    <div className="userInfo">
                        <h3>Username</h3>
                        <span>{username}</span>
                        <div className="changeInput" style={newUsernameStyle}>
                            <div className="inputAndError">
                                <input type="text" spellCheck={false} value={newUsername} onChange={(e) => setNewUsername(e.target.value)} onFocus={handleFocus}/>
                                <p className="errorUpdate" style={error1Style}>{error1}</p>
                            </div>
                            <button name='username' onClick={(e) => updateProfile(e)}>Confirm</button>
                            <button name='username' onClick={(e) => cancelBtn(e)}>Cancel</button>
                        </div>
                    </div>
                    <button style={b1Style} name='username' onClick={(e) => changeBtn(e)}>Change</button>
                </div>

                <div className="userInfoChange">
                    <div className="userInfo">
                        <h3>Email</h3>
                        <span>{email}</span>
                        <div className="changeInput" style={newEmailStyle}>
                            <div className="inputAndError">
                                <input type="text" spellCheck={false} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} onFocus={handleFocus}/>
                                <p className="errorUpdate" style={error2Style}>{error2}</p>
                            </div>
                            <button name='email' onClick={(e) => updateProfile(e)}>Confirm</button>
                            <button name='email' onClick={(e) => cancelBtn(e)}>Cancel</button>
                        </div>
                    </div>
                    <button style={b2Style} name='email' onClick={(e) => changeBtn(e)}>Change</button>
                </div>

                <div className="userInfoChange">
                    <div className="userInfo">
                        <h3>Password</h3>
                        <div className="changeInput" style={newPasswordStyle}>
                            <div className="inputAndError">
                                <input type="text" spellCheck={false} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} onFocus={handleFocus}/>
                                <p className="errorUpdate" style={error3Style}>{error3}</p>
                            </div>
                            <button name='password' onClick={(e) => updateProfile(e)}>Confirm</button>
                            <button name='password' onClick={(e) => cancelBtn(e)}>Cancel</button>
                        </div>
                    </div>
                    <button style={b3Style} name='password' onClick={(e) => changeBtn(e)}>Change</button>
                </div>

                <div className="userInfoChange">
                    <div className="userInfo">
                        <h3>Add Description</h3>
                        <div className="changeInput" style={descriptionStyle}>
                            <div className="inputAndError">
                                <textarea spellCheck={false} value={description} onChange={(e) => setDescription(e.target.value)} onFocus={handleFocus}/>
                                <p className="errorUpdate" style={error4Style}>{error4}</p>
                            </div>
                            <button name='description_text' onClick={(e) => updateProfile(e)}>Confirm</button>
                            <button name='description_text' onClick={(e) => cancelBtn(e)}>Cancel</button>
                        </div>
                    </div>
                    <button style={b4Style} name='description' onClick={(e) => changeBtn(e)}><span className="material-symbols-outlined">add</span></button>
                </div>
            </div>

            <hr className='hr'/>
            <div className="logout bottom_settings">
                <p>Logout of reddit</p>
                <button onClick={() => logout()}>Log Out</button>
            </div>

            <hr className='hr'/>
            <div className="delete_ac bottom_settings">
                <p>Delete account</p>
                <button onClick={() => deleteAcc()}>Delete</button>
            </div>

        </div>
    );
}

export default Settings;