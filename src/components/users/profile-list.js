import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import userService from '../../services/user-service'
import '../home/home.css'

const ProfileList = () => {
    const [readers, setReaders] = useState([])
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        userService.findAllAuthors()
            .then(res => setAuthors(res));
    }, [])

    useEffect(() => {
        userService.findAllReaders()
            .then(res => setReaders(res));
    }, [])

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <div className="row author-reader-list home-page-users">
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
            <div className="row home-page-users author-reader-list">
                <ul className='list-group user-list col-sm'>
                    {
                        authors.map(author =>
                            <li className='list-group-item col-sm'
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

        </div>

    )
}

export default ProfileList