const LOCAL_API = 'http://localhost:4000/api';

export const addBookmark = (bookId, userId, username, bookTitle) => {
    return fetch(`${LOCAL_API}/bookmarks/add`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({bookId, userId, username, bookTitle})
    }).then(res => res.json())
}

export const removeBookmark = (bookId, userId) => {
    return fetch(`${LOCAL_API}/bookmarks/remove`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({bookId, userId})
    }).then(res => res.json())
}

export const getBookmarksForUser = (userId) => {
    return fetch(`${LOCAL_API}/bookmarks/user/${userId}`)
        .then(res => res.json())
}

export const IsBookmark = (bookId, userId) => {
    return fetch(`${LOCAL_API}/bookmarks/currentUser/${bookId}/${userId}`)
        .then(res => res.json())
}

export const getBookmarksForUsername = (username) => {
    return fetch(`${LOCAL_API}/bookmarks/username/${username}`)
        .then(res => res.json())
}

export const getAllBookmarks = () => {
    return fetch(`${LOCAL_API}/bookmarks/all`)
        .then(res => res.json())
}

const api = {
    IsBookmark,
    addBookmark,
    removeBookmark,
    getBookmarksForUser,
    getBookmarksForUsername,
    getAllBookmarks
}

export default api