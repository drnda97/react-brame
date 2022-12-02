import React, {FC, useEffect, useState} from "react";
import "./header.css";
// @ts-ignore
import { Link, useHistory } from "react-router-dom";

const Header: FC = () => {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if(document.cookie) {
            setLoggedIn(true);
        }
    }, [])

    const logoutHandler = ():void => {
        document.cookie = `token=; Max-Age=0;`;
        return history.push('/');
    }

    return (
        <header className="header">
            <div className="logoWrap">
                <div>LOGO</div>
            </div>
            <div className="menuWrap">
                <Link to="/">Home</Link >
                {loggedIn ? <span onClick={logoutHandler}>Logout</span > : <Link to="/login">Login</Link >}
            </div>
        </header>
    )
}

export default Header;