import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import bookmarkService from '../../services/bookmark-service'
import './home.css'

const Home = ({user}) => {

    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        bookmarkService.getAllBookmarks()
            .then(res => setBookmarks(res));
    }, [])

    return (
        <div>
            <br/>
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
            <br/>
            { user &&
                <div className="bottom-padding">
                    <h4>
                        <span className="user-name-link-background">
                        Take a look at what people are reading.
                        </span>
                    </h4>
                    <ul className='homepage-icons'>
                        {
                            bookmarks.map(bookmark =>
                                <li
                                    key={bookmark._id}>
                                    <Link
                                        to={`/details/${bookmark.bookId}`}
                                        className="homepage-icons-item">
                                        <img alt={``}
                                             src={`http://books.google.com/books/content?id=${bookmark.bookId}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}
                                             height="220px" width="193px"
                                        />
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
                            Create an account or log in to see what our users are adding to their bookshelves.
                        </span>
                    </h4>
                </div>
            }
        </div>
    )
}

export default Home