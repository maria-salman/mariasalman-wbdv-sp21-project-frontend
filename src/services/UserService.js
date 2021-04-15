//const USER_URL = 'http://localhost:8080/api'
const USER_URL = process.env.REACT_APP_USER_URL;

export const createUser = (uid, user) =>
  fetch(`${USER_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())

export const findAllUsers = () =>
    fetch(USER_URL)
        .then(response => response.json())

export const findUserById = (uid) =>
  fetch(`${USER_URL}/users/${uid}`)
    .then(response => response.json())

export const updateUser = (uid, user) =>
  fetch(`${USER_URL}/users/${uid}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())

export const deleteUser = (uid) =>
  fetch(`${USER_URL}/users/${uid}`, {
    method: 'DELETE'
  }).then(response => response.json())

const UserService = {
    createUser,
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser
}

export default UserService