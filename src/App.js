import {BrowserRouter, Link, Route} from "react-router-dom";
import Home from "./components/home";
import Search from "./components/search";
import Details from "./components/details";
import Login from "./components/users/login";
import Register from "./components/users/register";
import Profile from "./components/users/profile";
import SearchApi from "./components/users/search-api";
import './App.css';


function App() {
    return (
        <div className="container-fluid">
            <BrowserRouter>
                <Route path="/" exact={true}>
                    <Home/>
                </Route>
                <Route path={["/search", "/search/:journey"]} exact={true}>
                    <Search/>
                </Route>
                <Route path={["/details/"]} exact={true}>
                    <Details/>
                </Route>
                <Route path={["/login"]} exact={true}>
                    <Login/>
                </Route>
                <Route path={["/profile", "/profile/:profileId"]} exact={true}>
                    <Profile/>
                </Route>
                <Route path={["/search-api", "/search-api/"]} exact={true}>
                    <SearchApi/>
                </Route>
                <Route path={["/register"]} exact={true}>
                    <Register/>
                </Route>
            </BrowserRouter>
        </div>
    );
}

export default App;