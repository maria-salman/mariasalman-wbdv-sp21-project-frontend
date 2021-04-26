require('dotenv').config()

export const findBookByTitle = (title) =>
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
        .then(response => response.json());

export function findBookById(bookId) {
    let API_URL = 'https://www.googleapis.com/books/v1/volumes/' + bookId
    return fetch(API_URL)
        .then(response => response.json())
}

const api = {
    findBookByTitle,
    findBookById
}

export default api;
