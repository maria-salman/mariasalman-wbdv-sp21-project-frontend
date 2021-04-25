import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import userService from '../../services/user-service'
import '../home/home.css'

const ProfileList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.findAllUsers()
            .then(res => setUsers(res));
    }, [])

    return (

        <div className="bottom-padding col-sm-8">
            <br/>
            <h1>Users</h1>
            <br/>
            <div className="col-sm-8">
                <ul className='list-group col-sm-8'>
                    {
                        users.map(user =>
                            <li className='list-group-item col-sm-12'
                                key={user._id}>
                                <Link
                                    to={`/profile/${user._id}`}
                                    className="bookmark-link">
                                    {user.username}
                                </Link>
                            </li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default ProfileList