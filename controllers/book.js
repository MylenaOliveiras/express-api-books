const { getAllBooks, getBookById, insertBook, updateBook, removeBookById} = require('../services/book');

function checkIdExists(id) {
    const books = getAllBooks();
    return books.some(book => book.id === parseInt(id, 10));
}

function checkIdIsValid(id, res) {
    if (id && !isNaN(Number(id))) {
        if (checkIdExists(id)) {
            return true;
        } else {
            res.status(404).send('Book not found');
            return false;
        }
    } else {
        res.status(422).send('Invalid id');
        return false;
    }
}

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
        if (!checkIdIsValid(req.params.id, res)) {
            return;
        }

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
    try {
        const newBook = req.body;
        const schema = {
            id: 'number',
            name: 'string',
        };

        const isValid = Object.keys(schema).every(key => {
            return typeof newBook[key] === schema[key];
        });

        if (isValid) {
            insertBook(newBook);
            res.status(201);
            res.send('Book added');
        } else {
            res.status(422).send("Invalid book");
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

function patchBook(req, res){
    try{
         if (!checkIdIsValid(req.params.id, res)) {
            return;
        }
        const id = req.params.id;
        const newBook = req.body;
        updateBook(id, newBook);
        res.send('Book updated');
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

function deleteBook(req, res){
    try{
        const id = req.params.id;
         if (!checkIdIsValid(id, res)) {
            return;
        }
        
        removeBookById(id)
        res.send('Book deleted');
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}




module.exports = {
    getBooks,
    getBook,
    postBook,
    patchBook,
    deleteBook
}