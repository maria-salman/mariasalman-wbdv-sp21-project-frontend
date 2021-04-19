import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import userService from '../../services/user-service'

const Login = () => {
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const history = useHistory()
    const login = () => {
        userService.login(credentials)
            .then((user) => {
                console.log(user)
                if(user === 0) {
                    alert("login failed, try again")
                } else {
                    history.push("/profile")
                }
            })
        history.push("/profile")
    }

    return(
        <div className = "container-fluid">
            <h1>Login</h1>
            <div className = "form-group row">
                <label htmlFor='username' className='col-sm-2 col-form-label'>Username</label>
                <div className = "col-sm-10">
                    <input
                        className = "form-control"
                        value={credentials.username}
                        onChange={(e) => {setCredentials({...credentials, username: e.target.value})}}
                        className="form-control"
                        id= "username"
                        placeholder="username"/>
                </div>
            </div>
            <div className = "form-group row">
                <label htmlFor='password' className='col-sm-2 col-form-label'>Password</label>
                <div className = "col-sm-10">
                    <input
                        className = "form-control"
                        value={credentials.password}
                        onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}
                        className="form-control"
                        id = "password"
                        placeholder="password"/>
                </div>
            </div>
            <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <button className="btn btn-primary btn-block"
                            onClick={login}>
                            Login
                            </button>
                        <button className="btn btn-danger btn-block"
                            formAction="/home">
                            Cancel
                            </button>
                        <div className="row">
                            <div className="col-6">
                                <Link to={"/"}>
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="col-6">
                                <Link to="/register"
                                    className="float-right">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Login;