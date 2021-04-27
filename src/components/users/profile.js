import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../services/user-service';
import bookmarkService from '../../services/bookmark-service';
import recommendationService from '../../services/recommendation-service';
import authoredService from '../../services/authored-book-service';

const Profile = ({user, setUser}) => {

    const [editing, setEditing] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [authoredBooks, setAuthoredBooks] = useState([]);

    const onChangeFullName = (e) => {
        const text = e.target.value;
        setUser({...user, fullName: text});
    }

    const onChangePassword = (e) => {
        const text = e.target.value;
        setUser({...user, password: text})
    }

    const onChangeEmail = (e) => {
        const emailVal = e.target.value;
        setUser({...user, email: emailVal});
    }

    const cancel = () => {
        setEditing(false);
    }

    const save = () => {
        userService.updateUser(user);
        setEditing(false);
    }

    useEffect(() => {
        if (user) {
            bookmarkService.getBookmarksForUser(user._id)
                .then(res => setBookmarks(res));
        }
        if (user && user.role === "AUTHOR") {
            recommendationService.getRecommendationsForUser(user._id)
                .then(res => setRecommendations(res));
        }
        if (user && user.role === "AUTHOR") {
            authoredService.getAuthoredBooksForUser(user._id)
                .then(res => setAuthoredBooks(res));
        }
    }, [user])

    return (
        <div className='container-fluid'>
            <br/>
            {
                editing && user &&
                <div>
                    <h2>{user.username}'s Profile</h2>
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            Full Name:
                            <input className='form-control'
                                   onChange={onChangeFullName}
                                   value={user.fullName}
                            />
                        </li>
                        <li className='list-group-item'>
                            Username: {user.username}
                        </li>
                        <li className='list-group-item'>
                            New password:
                            <input className='form-control'
                                   type='password'
                                   onChange={onChangePassword}
                                   value={user.password}
                            />
                        </li>
                        <li className='list-group-item'>
                            Change email on file:
                            <input className='form-control'
                                   onChange={onChangeEmail}
                                   value={user.email}
                            />
                        </li>
                        <li className='list-group-item'>
                            Role: {user.role}
                        </li>
                    </ul>
                    <br/>
                    <div>
                    <button className='btn btn-success'
                            onClick={save}>
                        Save changes
                    </button>
                    <button className='btn btn-danger float-right'
                            onClick={cancel}>
                        Discard changes
                    </button>
                    </div>
                </div>
            }
            {
                !user &&
                <>
                    <br/>
                    <div className="alert alert-warning">
                        <strong>
                            Warning! Must be logged in to view profile.
                        </strong>
                    </div>
                    <Link className='btn btn-secondary'
                          to='/login'>
                        Login now
                    </Link>
                </>
            }
            {
                !editing && user &&
                <div>
                    <h1>{user.username}'s Profile</h1>
                    <div className="row">
                        <h4 className="account-headers col-11">
                            General Account Settings
                        </h4>
                        <button className='btn btn-secondary float-right col-1 edit-profile-btn'
                                onClick={() =>
                                    setEditing(true)}>
                            Edit settings
                        </button>
                    </div>
                    <ul className='list-group'>

                        <li className='list-group-item'>Full Name: {user.fullName}</li>
                        <li className='list-group-item'>Username: {user.username}</li>
                        <li className='list-group-item'>Email address: {user.email}</li>
                        <li className='list-group-item'>Role: {user.role}</li>
                    </ul>
                    <br/>
                </div>
            }
            {
                !editing && user && user.role === "READER" &&
                <div className="bottom-padding">
                    <h4 className="account-headers">
                        Bookmarks
                    </h4>
                    <ul className='list-group bookmark-link'>
                        {bookmarks.map(bookmark =>
                            <Link key={bookmark._id}
                                  className='list-group-item bookmark-link'
                                  to={`/details/${bookmark.bookId}`}>
                                {bookmark.bookTitle}
                            </Link>
                        )}
                    </ul>
                </div>
            }
            {
                !editing && user && user.role === "AUTHOR" &&
                <div>
                    <h4 className="account-headers">
                        Authored Books
                    </h4>
                    <ul className='list-group bookmark-link'>
                        {authoredBooks.map(book =>
                            <Link key={book._id}
                                  className='list-group-item bookmark-link'
                                  to={`/details/${book.bookId}`}>
                                  {book.bookTitle}
                            </Link>
                        )}
                    </ul>
                </div>
            }
            <br/>
            { !editing && user && user.role === "AUTHOR" &&
                <div>
                    <h4 className="account-headers">
                        Recommendation List
                    </h4>
                        <ul className='list-group bookmark-link'>
                            {recommendations.map(recommendation =>
                            <Link key={recommendation._id}
                                className='list-group-item bookmark-link'
                                to={`/details/${recommendation.bookId}`}>
                                {recommendation.bookTitle}
                            </Link>
                             )}
                        </ul>
                </div>
            }
            <br/>
            { !editing && user && user.role === "AUTHOR" &&
            <div className="bottom-padding">
                <h4 className="account-headers">
                    Bookmarks
                </h4>
                <ul className='list-group bookmark-link'>
                    {bookmarks.map(bookmark =>
                        <Link key={bookmark._id}
                              className='list-group-item bookmark-link'
                              to={`/details/${bookmark.bookId}`}>
                            {bookmark.bookTitle}
                        </Link>
                    )}
                </ul>
            </div>
            }
        </div>
    )
}

export default Profile