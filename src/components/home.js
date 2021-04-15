import React from "react";
import {Link} from "react-router-dom";
import './home.css'

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <br/>
            <Link to="/search/">
                <h1>Search</h1>
            </Link>
            <Link to="/details">
                <h1>Details</h1>
            </Link>
            <Link to="/login">
                <h1>Login</h1>
            </Link>
            <Link to="/register">
                <h1>Register</h1>
            </Link>

        </div>
    )
}

export default Home;