import React, {FC, useState} from "react";
import "./login.css"
// @ts-ignore
import { useHistory } from "react-router-dom";

const Login: FC = () => {
    let history = useHistory();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = ():void => {
        if(!username.trim() || !password.trim()) {
            alert('Fields must be populated correctly!');
        }
        let expiryDate = new Date(new Date().setHours(new Date().getHours() + 1));
        document.cookie = `token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN; expires=${expiryDate}`;
        history.push('/admin');
    }
    const handleUsernameChange = (event: { target: { value: string; }; }):void => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event: { target: { value: string; }; }):void => {
        setPassword(event.target.value);
    }

    return (
        <div className="login">
            <div className="login-screen">
                <div className="app-title">
                    <h1>Login</h1>
                </div>

                <div className="login-form">
                    <div className="control-group">
                        <input type="text" className="login-field" value={username} placeholder="username" id="login-name" onChange={handleUsernameChange}/>
                        <label className="login-field-icon fui-user" htmlFor="login-name"></label>
                    </div>

                    <div className="control-group">
                        <input type="password" className="login-field" value={password} placeholder="password" id="login-pass" onChange={handlePasswordChange}/>
                        <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                    </div>

                    <a className="btn btn-primary btn-large btn-block" href="src/pages/Login/Login#" onClick={handleLogin}>login</a>
                </div>
            </div>
        </div>
    )
}

export default Login