import React from 'react'
import {Link} from "react-router-dom";

const Login = () => {

    return (
    <div className="container">

        <h1>Sign In</h1>

        <form>
            <div className="form-group row">
                <label htmlFor="username" className="col-sm-2 col-form-label">
                    Username </label>
                <div className="col-sm-10">
                    <input className="form-control"
                        id="username"
                        placeholder="Username"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="password"
                    className="col-sm-2 col-form-label">
                    Password </label>
                <div className="col-sm-10">
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="********"/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-10">
                    <button className="btn btn-primary btn-block"
                        formAction="/profile">
                        Sign in
                        </button>
                    <button className="btn btn-danger btn-block"
                        formAction="/home">
                        Cancel
                        </button>
                    <div className="row">
                        <div className="col-6">
                            <Link to={"#"}>
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="col-6">
                            <Link to={"/register"}
                                className="float-right">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    )
}

export default Login