import React, {FC} from "react";
import "./sidebar.css"
// @ts-ignore
import {Link} from "react-router-dom";

const Sidebar:FC = () => {
    return (
        <aside>
            <Link to="/admin">Articles</Link>
            <Link to="/categories">Categories</Link>
        </aside>
    )
}

export default Sidebar