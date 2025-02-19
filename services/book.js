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

module.exports = {
    getAllBooks,
    getBookById,
    insertBook
}
