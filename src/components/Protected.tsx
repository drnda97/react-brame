import React, {FC, useEffect, useState} from "react";
// @ts-ignore
import { useHistory } from 'react-router-dom';

type Props = {
    children: JSX.Element,
};
const ProtectedRoute:FC<Props> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(true);
    useEffect(() => {
        if(!document.cookie) {
            setLoggedIn(false);
        }
    }, [loggedIn])
    const history = useHistory();

    if (!loggedIn) {
        return history.push('/');
    }
    return children;
};
export default ProtectedRoute