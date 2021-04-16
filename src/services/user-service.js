// const USER_API = "http://localhost:4000/api/users";
const USER_API = process.env.REACT_APP_USER_API

const profile = () => {
    return fetch(`${USER_API}/profile`, {
        method: "POST",
        credentials: "include"
    }).then(response => response.json())
}


const login = (credentials) => {
    return fetch(`${USER_API}/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(credentials),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}

const register = (credentials) => {
    return fetch(`${USER_API}/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(credentials),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}

const logout = () => {}


const api {
    register, login, logout, profile
}

export default api