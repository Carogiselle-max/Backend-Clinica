const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
// Routes
// const userRoutes = require(''); example


// Use express to create the server
const app = express();
// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});