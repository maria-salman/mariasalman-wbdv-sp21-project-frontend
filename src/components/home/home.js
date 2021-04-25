import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import userService from '../../services/user-service'
import bookmarkService from '../../services/bookmark-service'
import './home.css'

const Home = ({user}) => {
    const [readers, setReaders] = useState([])
    const [authors, setAuthors] = useState([])
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        userService.findAllAuthors()
            .then(res => setAuthors(res));
    }, [])

    useEffect(() => {
        userService.findAllReaders()
            .then(res => setReaders(res));
    }, [])

    useEffect(() => {
        bookmarkService.getAllBookmarks()
            .then(res => setBookmarks(res));
    }, [])

    return (
        <div>
            <br/>
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
            <div className="row">
                <h4 className="col-sm home-page-users">
                    <span className="user-name-link-background">
                        Check out our author profiles
                    </span>
                </h4>
                <h4 className="col-sm home-page-users">
                    <span className="user-name-link-background">
                        Explore our reader profiles
                    </span>
                </h4>
            </div>
            <div className="row home-page-users author-list">
                <ul className='list-group user-list col-sm home-page-list author-list'>
                    {
                        authors.map(author =>
                            <li className='list-group-item col-sm home-page-list'
                                key={author._id}>
                                <Link
                                    to={`/profile/${author._id}`}
                                    className="user-links">
                                    {author.username}
                                </Link>
                            </li>)
                    }
                </ul>

                <ul className='list-group user-list col-sm'>
                    {
                        readers.map(reader =>
                            <li className='list-group-item col-sm'
                                key={reader._id}>
                                <Link
                                    to={`/profile/${reader._id}`}
                                    className="user-links">
                                    {reader.username}
                                </Link>
                            </li>)
                    }
                </ul>
            </div>
            <br/>
            <br/>
            { user &&
                <div className="bottom-padding">
                    <h4>
                        <span className="user-name-link-background">
                        Here's what people are bookmarking.
                        </span>
                    </h4>
                    <ul className='list-group user-list'>
                        {
                            bookmarks.map(bookmark =>
                                <li className='list-group-item col-sm'
                                    key={bookmark._id}>
                                    <Link
                                        to={`/details/${bookmark.bookId}`}>
                                        {bookmark.bookTitle}
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            }
            {
                !user &&
                <div>
                    <h4>
                        <span className="user-name-link-background">
                            Create an account or log in to see what our users are bookmarking.
                        </span>
                    </h4>
                </div>
            }
        </div>
    )
}

export default Home