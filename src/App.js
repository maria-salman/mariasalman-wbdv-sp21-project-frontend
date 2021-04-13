import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home";
import Search from "./components/search";
import Details from "./components/details";
import Login from "./components/login";
import Register from "./components/register";
import './App.css';

function App() {
    return (
        <div className="container-fluid">
            <BrowserRouter>
                <Route path="/" exact={true}>
                    <Home/>
                </Route>
                <Route path={["/search"]} exact={true}>
                    <Search/>
                </Route>
                <Route path={["/details/"]} exact={true}>
                    <Details/>
                </Route>
                <Route path={["/login"]} exact={true}>
                    <Login/>
                </Route>
                <Route path={["/register"]} exact={true}>
                    <Register/>
                </Route>
            </BrowserRouter>
        </div>
    );
}

export default App;