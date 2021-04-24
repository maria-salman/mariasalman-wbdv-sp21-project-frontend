const LOCAL_API = 'http://localhost:4000/api';

export const addRecommendation = (bookId, userId, username, bookTitle) => {
    return fetch(`${LOCAL_API}/recommendations/add`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({bookId, userId, username, bookTitle})
    }).then(res => res.json())
}

export const removeRecommendation = (bookId, userId) => {
    return fetch(`${LOCAL_API}/recommendations/remove`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({bookId, userId})
    }).then(res => res.json())
}

export const getRecommendationsForUser = (userId) => {
    return fetch(`${LOCAL_API}/recommendations/user/${userId}`)
        .then(res => res.json())
}

export const IsRecommendation = (bookId, userId) => {
    return fetch(`${LOCAL_API}/recommendations/currentUser/${bookId}/${userId}`)
        .then(res => res.json())
}

export const getRecommendationsForUsername = (username) => {
    return fetch(`${LOCAL_API}/recommendations/username/${username}`)
        .then(res => res.json())
}

export const getAllRecommendations = () => {
    return fetch(`${LOCAL_API}/recommendations/all`)
        .then(res => res.json())
}

const api = {
    addRecommendation,
    removeRecommendation,
    getRecommendationsForUser,
    IsRecommendation,
    getRecommendationsForUsername,
    getAllRecommendations
}

export default api