import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import bookService from '../../services/book-service'
import bookmarkService from '../../services/bookmark-service'
import recommendationService from '../../services/recommendation-service'
import authoredService from '../../services/authored-book-service'
import './details.css'


const Details = ({user}) => {
    const {bookId} = useParams();
    const [bookDetails, setBookDetails] = useState([]);
    const [bookLoaded, setBookLoaded] = useState(false);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [recommendation, setRecommendation] = useState(false);
    const [authoredBook, setAuthoredBook] = useState(false);
    const [users, setUsers] = useState([])
    const history = useHistory();

    useEffect(() => {
        bookService.findBookById(bookId)
            .then(items => {
                setBookDetails(items)
                setBookLoaded(true)
                console.log(items)
            })
            if (user) {
                bookmarkService.IsBookmark(bookId, user._id)
                    .then(res => setBookmark(res))
            }
            if (user && user.role === "AUTHOR") {
                recommendationService.IsRecommendation(bookId, user._id)
                    .then(res => setRecommendation(res))
            }
        if (user && user.role === "AUTHOR") {
            authoredService.IsAuthoredBook(bookId, user._id)
                .then(res => setAuthoredBook(res))
        }
    }, [bookId, user])


    useEffect(() => {
        bookmarkService.getAllUsersForBookmark(bookId)
            .then(res => {
                setUsers(res)
                setUsersLoaded(true)
            })
    }, [bookId])

    const addBookmark = () => {
        bookmarkService.addBookmark(bookId, user._id, user.username, bookDetails.volumeInfo.title)
            .then(() => setBookmark(true));
    }

    const removeBookmark = () => {
        bookmarkService.removeBookmark(bookId, user._id)
            .then(() => setBookmark(false));
    }

    const addRecommendation = () => {
        recommendationService.addRecommendation(bookId, user._id, user.username, bookDetails.volumeInfo.title)
            .then(() => setRecommendation(true));
    }

    const removeRecommendation = () => {
        recommendationService.removeRecommendation(bookId, user._id)
            .then(() => setRecommendation(false));
    }

    const addAuthoredBook = () => {
        authoredService.addAuthoredBook(bookId, user._id, user.username, bookDetails.volumeInfo.title)
            .then(() => setAuthoredBook(true));
    }

    const removeAuthoredBook = () => {
        authoredService.removeAuthoredBook(bookId, user._id)
            .then(() => setAuthoredBook(false));
    }

    const onClickMustLogin = () => {
        alert("Must be logged in to bookmark item.")
    }

    return (

        <div>
            { bookLoaded &&
            <div>
                <br/>
                <div className="row">
                    <i className='fas fa-arrow-alt-circle-left fa-2x col-sm-6' onClick={() => history.goBack()}/>
                    {
                    user && user.role === "READER" &&
                    <div>
                        <Link className='fas fa-book bookmark float-right library-padding' to='/profile'>My bookshelf</Link>
                        {
                            !bookmark &&
                            <button className='btn btn-clear'
                                    onClick={addBookmark}>
                                <i className='far fa-bookmark float-right bookmark left-reader-padding'>
                                    Add Bookmark
                                </i>
                                </button>
                        }
                        {
                            bookmark &&
                            <button className='btn btn-clear'
                                                onClick={removeBookmark}>
                                <i className='fas fa-bookmark float-right bookmark left-reader-padding'>
                                    Remove Bookmark
                                </i>
                                </button>
                        }
                    </div>
                    }
                    {
                    user && user.role === "AUTHOR" &&
                    <div className="left-author-padding">
                        <Link className='fas fa-book bookmark float-right library-padding' to='/profile'>My library</Link>
                        {
                            !bookmark &&
                            <button className='btn btn-clear'
                                    onClick={addBookmark}>
                                <i className='far fa-bookmark float-right bookmark left-padding'>
                                    Bookmark
                                </i>
                            </button>
                        }
                        {
                            bookmark &&
                            <button className='btn btn-clear'
                                    onClick={removeBookmark}>
                                <i className='fas fa-bookmark float-right bookmark'>
                                    Remove Bookmark
                                </i>
                            </button>
                        }
                        {
                            !recommendation &&
                            <button className='btn btn-clear'
                                    onClick={addRecommendation}>
                                <i className='fas fa-plus-circle float-right bookmark'>
                                    Add to Recommendations
                                </i>
                            </button>
                        }
                        {
                            recommendation &&
                            <button className='btn btn-clear'
                                    onClick={removeRecommendation}>
                                <i className='fas fa-minus-circle float-right bookmark'>
                                    Remove Recommendation
                                </i>
                            </button>
                        }
                        {
                            !authoredBook &&
                            <button className='btn btn-clear'
                                    onClick={addAuthoredBook}>
                                <i className='fas fa-pen float-right bookmark'>
                                    Add to Authored List
                                </i>
                            </button>
                        }
                        {
                            authoredBook &&
                            <button className='btn btn-clear'
                                    onClick={removeAuthoredBook}>
                                <i className='fas fa-minus-circle float-right bookmark'>
                                    Remove from Authored List
                                </i>
                            </button>
                        }
                    </div>
                    }
                    {
                    !user &&
                    <div className="col-sm-6">
                        {
                            !bookmark &&
                            <button className='btn btn-clear float-right'
                                    onClick={onClickMustLogin}>
                                <i className='far fa-bookmark bookmark'>
                                    Add Bookmark
                                </i>
                            </button>
                        }
                    </div>
                    }
                </div>
                <br/>
                <div className="bottom-padding">
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            <img alt={`${bookDetails.volumeInfo.title} book`}
                                 src={`http://books.google.com/books/content?id=${bookDetails.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}
                                 height="275px" width="185px"
                            />
                        </li>
                        <li className='list-group-item'>
                            <p className="detail-fields">Title:</p>
                            <p>{bookDetails.volumeInfo.title}</p>
                        </li>
                        <li className='list-group-item'>
                            <p className="detail-fields">Author(s):  </p>
                            <p>{bookDetails.volumeInfo.authors}</p>
                        </li>
                        <li className='list-group-item'>
                            <p className="detail-fields">Categories: </p>
                            <p>{bookDetails.volumeInfo.categories}</p>
                        </li>
                        <li className='list-group-item'>
                            <p className="detail-fields">Ratings Count:</p>
                            <p>{bookDetails.volumeInfo.ratingsCount}</p>
                            <p className="detail-fields">Average Rating:</p>
                            <p>{bookDetails.volumeInfo.averageRating} </p>
                        </li>
                        <li className='list-group-item'>
                            <p className="detail-fields">Page Count: </p>
                            <p>{bookDetails.volumeInfo.pageCount}</p>
                        </li>
                        <li className='list-group-item'>
                            <p className="detail-fields">Publisher: </p>
                            <p>{bookDetails.volumeInfo.publisher}</p>
                            <p className="detail-fields">Published Date:</p>
                            <p>{bookDetails.volumeInfo.publishedDate}</p>
                        </li>
                    </ul>
                </div>
            </div>
            }
            { usersLoaded  && users !== [] && user &&
                <div className="bottom-padding">
                    <h4 className="title-color">Check out who has bookmarked this!</h4>
                    <ul className='list-group'>
                        {
                            users.map(user =>
                                <li className='list-group-item col-sm'
                                    key={user.userId}>
                                    <Link
                                        to={`/profile/${user.userId}`}
                                        className="user-links">
                                        {user.username}
                                    </Link>
                                </li>)
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default Details;