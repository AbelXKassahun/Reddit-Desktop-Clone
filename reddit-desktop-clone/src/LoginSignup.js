import {useState} from 'react';
import './CSS/login_signup.css';
import Login from './Login';
import Signup from './Signup';

const LoginSignup = () => {
    const [which, setWhich] = useState(true); // true = login, false = signup
    
    const changeWhich = (val) => {
        setWhich(val);
    }
    return (
        <div className="login_signup_popup">
            <div className="login_signup_close">
                <span className="material-symbols-outlined">close</span>
            </div>
            {which ? <Login changeWhich={changeWhich}/> : <Signup changeWhich={changeWhich}/>}
        </div>
    );
}

export default LoginSignup;