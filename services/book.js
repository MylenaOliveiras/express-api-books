const fs = require('fs');

function getAllBooks(){
    return JSON.parse(fs.readFileSync('books.json'));
}

function getBookById(id){
    const books = getAllBooks();
    return books.find(book => book.id === parseInt(id));
}

function insertBook(newBook){
    const books = getAllBooks();
    const newListBooks = [...books, newBook];
    fs.writeFileSync('books.json', JSON.stringify(newListBooks));
}

function updateBook(id, newBook){
    let books = getAllBooks();
    const index = books.findIndex(book => book.id === parseInt(id));
    const updatedBook = {...books[index], ...newBook};
    books[index] = updatedBook;
    fs.writeFileSync('books.json', JSON.stringify(books));
}

function removeBookById(id){
    let books = getAllBooks();
    const newBooksList = books.filter(book => book.id !== parseInt(id));
    fs.writeFileSync('books.json', JSON.stringify(newBooksList));
}

module.exports = {
    getAllBooks,
    getBookById,
    insertBook,
    updateBook,
    removeBookById
}
