import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import './CSS/login_signup.css';
import Login from './Login';
import Signup from './Signup';

const LoginSignup = ({toggleNavbar}) => {
    const [which, setWhich] = useState(true); // true = login, false = signup
    const navigate = useNavigate();

    const [contStyle, setContStyle] = useState({display: "flex"});
    const changeWhich = (val) => {
        setWhich(val);
    }

    const closeLoginSignUp = () => {
        navigate(-1);
    }

    useState(() => {
        toggleNavbar(true);
    },[])

    return (
        <div className="login_container" style={contStyle}>
            <div className="login_signup_popup">
                <div className="login_signup_close" onClick={() => closeLoginSignUp()}>
                    <span className="material-symbols-outlined">close</span>
                </div>
                {which ? <Login changeWhich={changeWhich}/> : <Signup changeWhich={changeWhich}/>}
            </div>
        </div>
    );
}

export default LoginSignup;