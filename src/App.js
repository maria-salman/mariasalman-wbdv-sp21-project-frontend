import './App.css';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Home from './components/home/home';
import Register from './components/users/register';
import Login from './components/users/login';
import Profile from './components/users/profile';
import Details from './components/details/details';
import Search from './components/search/search';
import userService from './services/user-service';
import UserPublicProfile from './components/util/user-public-profile';
import './components/util/navbar.css'
import ProfileList from "./components/users/profile-list";

function App() {
    const [user, setUser] = useState(undefined);

    const logout = () => {
        return userService.logout()
            .then(() => setUser(undefined));
    }

    useEffect(() => {
        userService.profile()
            .then(res => setUser(res));
    }, []);

    return (
        <div className='container-fluid'>
            <BrowserRouter>
                <nav className='navbar navbar-expand-lg navbar-dark'>
                    <img src="https://i.pinimg.com/474x/d4/d3/c0/d4d3c02f855019b7357b6c46da2124da.jpg"
                         alt=""
                         className="img-nav"
                    />
                    <Link className='navbar-brand' to='/'>BloomBook</Link>
                    <div className='collapse navbar-collapse'>
                        <div className='navbar-nav'>
                            <Link className='nav-item nav-link'
                                  to='/'>
                                Home
                            </Link>
                        </div>
                        <div className='navbar-nav'>
                            <Link className='nav-item nav-link'
                                  to='/search'>
                                Search
                            </Link>
                        </div>
                        <div className='navbar-nav'>
                            <Link className='nav-item nav-link'
                                  to='/profile'>
                                Profile
                            </Link>
                        </div>
                        <div className='navbar-nav'>
                            <Link className='nav-item nav-link'
                                  to='/profile-list'>
                                Users
                            </Link>
                        </div>
                    </div>
                    {
                        !user &&
                        <>
                            <Link className='btn btn-clear'
                                  to='/login'>
                                Login
                            </Link>
                            <Link className='btn btn-clear '
                                  to='/register'>
                                Register
                            </Link>
                        </>
                    }
                    {
                        user &&
                        <>
                            <div className='mr-3'>
                                <Link to='/profile'
                                      className="user-name-link">
                                    Hi {user.fullName}
                                </Link>
                            </div>
                            <button className='btn btn-secondary'
                                    onClick={logout}>
                                Logout
                            </button>
                        </>
                    }
                </nav>
                <Route exact={true}
                       path={['/']}>
                    <Home user={user}/>
                </Route>
                <Route exact={true}
                       path={['/register']}>
                    <Register user={user}/>
                </Route>
                <Route exact={true}
                       path={['/details/:bookId']}>
                    <Details user={user}/>
                </Route>
                <Route exact={true}
                       path={['/login']}>
                    <Login user={user}
                           setUser={setUser}/>
                </Route>
                <Route exact={true}
                       path={['/profile']}>
                    <Profile user={user}
                             setUser={setUser}/>
                </Route>
                <Route exact={true}
                       path={['/profile-list']}>
                    <ProfileList/>
                </Route>
                <Route exact={true}
                       path={['/search', '/search/:searchItem']}
                       component={Search}
                />
                <Route exact={true}
                       path={['/profile/:uid']}
                       component={UserPublicProfile}/>
            </BrowserRouter>
        </div>
    )
}

export default App;