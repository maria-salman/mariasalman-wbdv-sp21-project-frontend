import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import userService from '../../services/user-service'

const Register = () => {
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const history = useHistory()
    const register = () => {
        userService.register(credentials)
            .then((user) => {
                console.log(user)
                if(user === 0) {
                    alert("username already taken")
                } else {
                    history.push("/profile")
                }
            })
    }
    return(
        <div className= "container">
            <h1>Register</h1>
            <div className="form-group row">
                <label htmlFor="username"
                       className="col-sm-2 col-form-label">
                    Username </label>
                <div className= "col-sm-10">
                    <input
                        value={credentials.username}
                        id = "username"
                        onChange={(e) => {setCredentials({...credentials, username: e.target.value})}}
                        className="form-control"
                        placeholder="Create username"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="password"
                       className="col-sm-2 col-form-label">
                    Password </label>
                <div className= "col-sm-10">
                    <input
                        value={credentials.password}
                        id = "password"
                        onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}
                        className="form-control"
                        placeholder="Create password"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="validatePassword"
                       className="col-sm-2 col-form-label">
                    Confirm Password </label>
                <div className= "col-sm-10">
                    <input
                        className="form-control"
                        id = "validatePassword"
                        placeholder="Validate password"/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-10">
                    <button onClick={register} className="btn btn-primary">
                        Register
                    </button>
                    <div className="float-right">
                        <Link to="/login">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;