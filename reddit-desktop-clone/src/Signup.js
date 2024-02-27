import {useState, useEffect} from 'react';
import './CSS/Signup.css';

const Signup = ({changeWhich}) => {
    const [signupUsername, setSignupUsername] = useState(null);
    const [signupEmail, setSignupEmail] = useState(null);
    const [signupPassword, setSignupPassword] = useState(null);
    const [signupConfirmPassword, setSignupconfirmPassword] = useState('');

    //error messages
    const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState('');

    // error message styles
    const [usernameErrorStyles, setUsernameErrorStyles] = useState({display: 'none'});
    const [emailErrorStyles, setEmailErrorStyles] = useState({display: 'none'});
    const [passwordErrorStyles, setPasswordErrorStyles] = useState({display: 'none'});
    const [confirmPasswordErrorStyles, setConfirmPasswordErrorStyles] = useState({display: 'none'});

    // button disable
    const [isDisabled, setIsDisable] = useState(true);
    const [btnStyle, setBtnStyle] = useState({opacity: "0.5"});

    // confirm password style
    const [inputStyle, setInputStyle] = useState({display: "none"});

    const [isConfirming, setIsConfirming] = useState(false);
    const [confirmed, setConfirmed] = useState(false);


    const usernameCheck = (e) => {
        let val = e.target.value;
        const notAlphaNumbericRegex = /[^\w]/;
        const containsSymbolAndSpaces = notAlphaNumbericRegex.test(val);

        if(val.length < 6){
            setUsernameErrorStyles({display: 'flex'})
            if(containsSymbolAndSpaces){
                setUsernameErrorMsg("Username too short --- Symbols and Whitespaces aren't allowed in Usernames");
                setSignupUsername(null);
            }
            else{
                if(val.length == 0){
                    setUsernameErrorMsg("Username can't be empty");
                    setSignupUsername(null);
                }
                else{
                    setUsernameErrorMsg("Username too short");
                    setSignupUsername(null);
                }
            }
        }
        else{
            if(containsSymbolAndSpaces){
                setUsernameErrorStyles({display: 'flex'});
                setUsernameErrorMsg("Symbols and Whitespaces aren't allowed in usernames");
                setSignupUsername(null);
            }
            else{
                setUsernameErrorStyles({display: 'none'});
                setUsernameErrorMsg('');
                setSignupUsername(val);
            }
        }
    }

    const emailCheck = (e) => {
        let val = e.target.value;
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailRegex = /[A-Za-z0-9_]+@gmail\.com/i;
        const isCorrectEmail = emailRegex.test(val);
        const spaceRegex = /\s/;
        const containsSpace = spaceRegex.test(val);

        if(!isCorrectEmail && val.length > 10){
            setEmailErrorStyles({display: 'flex'});
            setEmailErrorMsg("Invalid email format");
            setSignupEmail(null);
        }
        else{
            if(!containsSpace){
                setEmailErrorStyles({display: 'none'});
                setEmailErrorMsg('');
                setSignupEmail(val);
            }
            else{
                setEmailErrorStyles({display: 'flex'});
                setEmailErrorMsg("Invalid email format");
                setSignupEmail(null);
            }

        }
    }
    
    const passwordCheck = (e) => {
        let val = e.target.value;
        const spaceRegex = /\s/;
        const containsSpace = spaceRegex.test(val);

        if(val.length < 8){
            setPasswordErrorStyles({display: 'flex'})
            if(containsSpace){
                setPasswordErrorMsg("Password is atleast 8 Characters -- Whitespaces aren't allowed in passwords")
                setSignupPassword(null);
                setInputStyle({display: "none"})

            }
            else{
                if(val.length == 0){
                    setPasswordErrorMsg("Password can't be empty");
                    setSignupPassword(null);
                    setInputStyle({display: "none"})

                }
                else{
                    setPasswordErrorMsg("Password is atleast 8 Characters");
                    setSignupPassword(null);
                    setInputStyle({display: "none"})

                }
            }
        }
        else{
            if(containsSpace){
                setPasswordErrorStyles({display: 'flex'});
                setPasswordErrorMsg("Whitespaces aren't allowed in passwords");
                setSignupPassword(null);
                setInputStyle({display: "none"})

            }
            else{
                setPasswordErrorStyles({display: 'none'});
                setPasswordErrorMsg('');
                setSignupPassword(val);
                setInputStyle({display: "flex"})
            }
        }
        if(isConfirming){
            setSignupconfirmPassword('');
            setInputStyle({display: "none"});
            setIsConfirming(false);
        }
    }

    const confirmPCheck = (e) => {
        setSignupconfirmPassword(e.target.value);
        setIsConfirming(true);

        let val = e.target.value;

        if(val !== signupPassword){
            setConfirmPasswordErrorStyles({display: "flex"});
            setConfirmPasswordErrorMsg("Passwords don't match");
            setConfirmed(false);
        }
        else{
            setConfirmPasswordErrorStyles({display: "none"});
            setConfirmPasswordErrorMsg('');
            setConfirmed(true);
        }
    }

    const handleSignup = () => {
        // fetch(`https://localhost:7166/User/Login?UserName=${loginUsername}&Password=${loginPassword}`, {
        //     method: 'POST',
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if(data.message === "Login successful"){
        //         console.log("Login successful");
        //         console.log(data);
        //         fromCache.signedIn(data.userId, loginUsername)
        //         navigate(-1)
        //     }
        // })
        // .catch(error => console.error('Error uploading post: ', error));
    }

    useEffect(() => {
        if(signupUsername && signupEmail && signupPassword && confirmed){
            setBtnStyle({opacity: "1", cursor: "pointer"});
            setIsDisable(false);
        }
        else{
            setBtnStyle({opacity: "0.5"});
            setIsDisable(true);
        }
    }, [signupUsername, signupEmail, signupPassword, confirmed]);



    return (
        <div className="signup">
            <div className="some_infn">
                <h3>Sign Up</h3>
                <p>By continuing, you agree to our User Agreement and Privacy Policy. </p>
            </div>
            <div className="input_container">
                <input type="text" name="" id="" className="email" placeholder='Email' onKeyUp={(e) => emailCheck(e)}/>
                <p style={emailErrorStyles}>{emailErrorMsg}</p>
            </div>
            <div className="input_container">
                <input type="text" name="" id="" className="username_signup" placeholder='Username' onKeyUp={(e) => usernameCheck(e)}/>
                <p style={usernameErrorStyles}>{usernameErrorMsg}</p>
            </div>
            <div className="input_container">
                <input type="password" name="" id="" className="password_signup" placeholder='Enter Password' onKeyUp={(e) => passwordCheck(e)}/>
                <p style={passwordErrorStyles}>{passwordErrorMsg}</p>
            </div>
            <div className="input_container" style={inputStyle}>
                <input type="password" name="" id="" className="confirm_password" placeholder='Confirm Password'  value={signupConfirmPassword} onChange={(e) => confirmPCheck(e)}/>
                <p style={confirmPasswordErrorStyles}>{confirmPasswordErrorMsg}</p>
            </div>
            <button className="confirm_signup" style={btnStyle} disabled={isDisabled} onClick={() => handleSignup()}>SIGN UP</button>
            <div className="other_option">
                <p>Already a Redditor ? <span onClick={() => changeWhich(true)} href="">LOG IN</span></p>
            </div>
        </div>
    );
}

export default Signup;