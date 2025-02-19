const express = require("express"); // Import express
const app = express(); // Create an express app
const bookRouter = require("./routes/book"); // Import the bookRouter

const port = 8000 // Port number

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/books", bookRouter); // Use the bookRouter for all routes that start with /books

// app.get("/", (req, res) => {
//     res.send("Hello World, Alura!");
// }); 
// Create a route

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); // Start the server


