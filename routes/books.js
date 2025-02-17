const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World, Alura!');
})

module.exports = router; // Export the router
