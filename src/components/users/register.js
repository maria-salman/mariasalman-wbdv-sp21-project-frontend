import React from "react";

const Register = () => {


    return (
        <div className="container">
            <h1>User Registration</h1>
            <form>
                <div className="form-group row">
                    <label htmlFor="username"
                        className="col-sm-2 col-form-label">
                        Username </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                            id="username"
                            placeholder="Create Username"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password"
                        className="col-sm-2 col-form-label">
                        Password </label>
                    <div className="col-sm-10">
                        <input type="password"
                            id="password"
                            className="form-control"
                            placeholder="Choose password"
                            />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="passwordVerify"
                        className="col-sm-2 col-form-label">
                        Verify Password</label>
                    <div className="col-sm-10">
                        <input type="password"
                                id="passwordVerify"
                                className="form-control"
                                placeholder="Confirm password"
                            />
                    </div>
                </div>
                <div className="form-group row">
                <label htmlFor="pickRole" className="col-sm-2 col-form-label">
                        Choose your role
                    </label>
                    <div className="col-sm-10 col-form-label">
                        <select name="pickRole" id="pickRole">
                            <option value="ADVENTURER">
                                Adventurer
                            </option>
                            <option value="ADMIN">
                                Admin
                            </option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <button className="btn btn-success btn-block"
                            formAction={`/profile`}>
                            Sign Up</button>
                        <button className="btn btn-danger btn-block"
                            formAction={"/"}>
                            Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Register;