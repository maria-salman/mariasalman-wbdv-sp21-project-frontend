import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import userService from '../../services/user-service'

const Login = () => {
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const history = useHistory()
    const login = () => {
        if (credentials.password === '' || credentials.username === '') {
            alert("All fields required.")
        } else {
            userService.login(credentials)
                .then((user) => {
                    console.log(user)
                    if (user === 0) {
                        alert("Login failed, try again. Did you misspell your username or password?")
                    } else {
                        history.push("/profile")
                    }
                })
        }
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
                        id = "password"
                        placeholder="password"/>
                </div>
            </div>
            <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <form>
                            <button className="btn btn-primary btn-block"
                                onClick={login}>
                                Login
                                </button>
                            <button className="btn btn-success btn-block"
                                    formAction="/register">
                                Sign Up
                            </button>
                            <button className="btn btn-danger btn-block"
                                formAction="/">
                                Cancel
                            </button>
                        </form>
                    </div>
            </div>
        </div>
    )
}

export default Login;