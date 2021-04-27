// const LOCAL_API = 'http://localhost:4000/api';
const LOCAL_API = process.env.REACT_APP_USER_API

export const addAuthoredBook = (bookId, userId, username, bookTitle) => {
    return fetch(`${LOCAL_API}/authoredBooks/add`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({bookId, userId, username, bookTitle})
    }).then(res => res.json())
}

export const removeAuthoredBook = (bookId, userId) => {
    return fetch(`${LOCAL_API}/authoredBooks/remove`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({bookId, userId})
    }).then(res => res.json())
}

export const getAuthoredBooksForUser = (userId) => {
    return fetch(`${LOCAL_API}/authoredBooks/user/${userId}`)
        .then(res => res.json())
}

export const IsAuthoredBook = (bookId, userId) => {
    return fetch(`${LOCAL_API}/authoredBooks/currentUser/${bookId}/${userId}`)
        .then(res => res.json())
}

export const getAllAuthoredBooks = () => {
    return fetch(`${LOCAL_API}/authoredBooks/all`)
        .then(res => res.json())
}

const api = {
    IsAuthoredBook,
    addAuthoredBook,
    removeAuthoredBook,
    getAuthoredBooksForUser,
    getAllAuthoredBooks
}

export default api