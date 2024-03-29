const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const survPerkRouter = require('./perks/survperks');
const userRouter = require('./users/users');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000; // Define the port to listen on

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(cors());
app.use(bodyParser.json());
app.use('/perks', survPerkRouter);
app.use('/users', userRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});