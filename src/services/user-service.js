//const USER_API = "http://localhost:4000/api";
const USER_API = process.env.REACT_APP_USER_API

export const register = (username, password, fullName, email, role) => {
    return fetch(`${USER_API}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({username, password, fullName, email, role})
    }).then(response => response.json());
}

export const login = (username, password) => {
    return fetch(`${USER_API}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then(response => response.json());
}

export const updateUser = (body) => {
    return fetch(`${USER_API}/profile/update`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(response => response.json());
}

export const profile = () => {
    return fetch(`${USER_API}/profile`, {
        credentials: 'include'
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            return undefined
        }
    })
}

export const logout = () => {
    return fetch(`${USER_API}/logout`, {
        method: 'POST',
        credentials: 'include'
    });
}

export const findAllUsers = () => {
     return fetch(`${USER_API}/users`)
        .then(response => response.json())
}

const api = {
    login,
    register,
    logout,
    profile,
    updateUser,
    findAllUsers
}

export default api;