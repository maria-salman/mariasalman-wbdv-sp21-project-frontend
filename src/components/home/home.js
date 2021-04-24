import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import userService from '../../services/user-service'
import bookmarkService from '../../services/bookmark-service'
import './home.css'

const Home = ({user}) => {
    const [users, setUsers] = useState([])
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        userService.findAllUsers()
            .then(res => setUsers(res));
    }, [])

    useEffect(() => {
        bookmarkService.getAllBookmarks()
            .then(res => setBookmarks(res));
    }, [])


    return (

        <div>
            <h1>Home</h1>
            <Link to="/register"
                  className="home-links">
                Register
            </Link>
            <br/>
            <Link to="/login"
                  className="home-links">
                Login
            </Link>
            <br/>
            <Link to="/profile"
                  className="home-links">
                Profile
            </Link>
            <br/>
            <Link to="/search"
                  className="home-links">
                Search
            </Link>
            <br/>
            <br/>
            <br/>
            <div>
                <h3 className="user-name-link">Check out our authors and readers!</h3>
                <ul className='list-group user-list'>
                    {
                        users.map(user =>
                            <li className='list-group-item col-sm'
                                key={user._id}>
                                <Link
                                    to={`/profile/${user._id}`}>
                                    {user.username}
                                </Link>
                            </li>)
                    }
                </ul>
            </div>

            <br/>
            { user &&
                <div>
                    <h3 className="user-name-link">Here's what people are bookmarking!</h3>
                    <ul className='list-group user-list'>
                        {
                            bookmarks.map(bookmark =>
                                <li className='list-group-item col-sm'
                                    key={bookmark._id}>
                                    <Link
                                        to={`/details/${bookmark.bookId}`}>
                                        {bookmark.bookTitle}
                                    </Link>
                                </li>)
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default Home