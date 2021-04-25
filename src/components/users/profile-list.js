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

        <div className="bottom-padding">
            <br/>
            <h1>Users</h1>
            <br/>
            <div>
                <ul className='list-group'>
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
        </div>
    )
}

export default ProfileList