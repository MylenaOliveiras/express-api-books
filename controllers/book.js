const { getAllBooks, getBookById, insertBook} = require('../services/book');

function getBooks(req, res){
    try{
        const books = getAllBooks();
        res.send(books);
    } catch (error) {
        console.log(error);
        res.status(500)
        res.send('An error occurred');
    }
}

function getBook(req, res){
    try{
        const id = req.params.id;
        const book = getBookById(id);

        if(book){
            res.send(book);
        } else {
            res.status(404);
            res.send('Book not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send('An error occurred');
    }
}

function postBook(req, res){
    try{
        const newBook = req.body;
        console.log(req)
        console.log("oi")
        if (newBook){
        insertBook(newBook);
        res.status(201)
        res.send('Book added');
        } else {
            throw new Error('Invalid book');
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


module.exports = {
    getBooks,
    getBook,
    postBook
}