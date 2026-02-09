const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

// Import Routes

const userRoutes = require('./routes/userRoutes');


// Use express to create the server
const app = express();
// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes   
app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});