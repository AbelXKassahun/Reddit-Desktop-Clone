import {useState, useEffect} from 'react';
import './CSS/login.css';

const Login = ({changeWhich}) => {
    const [loginUsername, setLoginUsername] = useState(null);
    const [loginPassword, setLoginPassword] = useState(null);
    //error messages
    const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    // error message styles
    const [usernameErrorStyles, setUsernameErrorStyles] = useState({display: 'none'});
    const [passwordErrorStyles, setPasswordErrorStyles] = useState({display: 'none'});

    // button disable
    const [isDisabled, setIsDisable] = useState(true);
    const [btnStyle, setBtnStyle] = useState({opacity: "0.5"});


    const usernameCheck = (e) => {
        let val = e.target.value;
        const notAlphaNumbericRegex = /[^\w]/;
        const containsSymbolAndSpaces = notAlphaNumbericRegex.test(val);

        if(val.length < 6){
            setUsernameErrorStyles({display: 'flex'})
            if(containsSymbolAndSpaces){
                setUsernameErrorMsg("Username too short ----- Symbols and Whitespaces aren't allowed in Usernames");
                setLoginUsername(null);
            }
            else{
                if(val.length == 0){
                    setUsernameErrorMsg("Username can't be empty");
                    setLoginUsername(null);
                }
                else{
                    setUsernameErrorMsg("Username too short");
                    setLoginUsername(null);
                }
            }
        }
        else{
            if(containsSymbolAndSpaces){
                setUsernameErrorStyles({display: 'flex'});
                setUsernameErrorMsg("Symbols and Whitespaces aren't allowed in usernames");
                setLoginUsername(null);
            }
            else{
                setUsernameErrorStyles({display: 'none'});
                setUsernameErrorMsg('');
                setLoginUsername(val);
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
                setLoginPassword(null);
            }
            else{
                if(val.length == 0){
                    setPasswordErrorMsg("Password can't be empty");
                    setLoginPassword(null);
                }
                else{
                    setPasswordErrorMsg("Password is atleast 8 Characters");
                    setLoginPassword(null);
                }
            }
        }
        else{
            if(containsSpace){
                setPasswordErrorStyles({display: 'flex'});
                setPasswordErrorMsg("Whitespaces aren't allowed in passwords");
                setLoginPassword(null);
            }
            else{
                setPasswordErrorStyles({display: 'none'});
                setPasswordErrorMsg('');
                setLoginPassword(val);
            }
        }
    }

    const login_btn = () => {
        console.log("log in bitch");
    }

    useEffect(() => {
        if(loginUsername && loginPassword){
            setBtnStyle({opacity: "1"});
            setIsDisable(false);
        }
        else{
            setBtnStyle({opacity: "0.5"});
            setIsDisable(true);
        }
    }, [loginUsername, loginPassword]);

    return (
        <div className="login">
            <div className="some_infn">
                <h3>Log In</h3>
                <p>By continuing, you agree to our User Agreement and Privacy Policy. </p>
            </div>
            <div className="input_container">
                <input type="text" name="" id="" placeholder='Username' spellCheck={false} onKeyUp={(e) => usernameCheck(e)}/>
                <p style={usernameErrorStyles}>{usernameErrorMsg}</p>
            </div>
            <div className="input_container">
                <input type="password" name="" id="" placeholder='Password' spellCheck={false} onKeyUp={(e) => passwordCheck(e)}/>
                <p style={passwordErrorStyles}>{passwordErrorMsg}</p>
            </div>

            <button className="confirm_login" style={btnStyle} disabled={isDisabled} onClick={login_btn}>LOG IN</button>
            <div className="other_option">
                <p>New to Reddit ? <span onClick={() => changeWhich(false)} href="">SIGN UP</span></p>
            </div>  
        </div>
    );
}

/*
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    type={showPassword ? 'text' : 'password'}
*/

export default Login;