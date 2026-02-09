const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

// Import Routes

const userRoutes = require('./routes/userRoutes');

// Import Routes
const { connectDB } = require('./config/database');
// const authRoutes = require('./routes/auth.routes');
// const userRoutes = require('./routes/user.routes');

// Use express to create the server
const app = express();
//  Database
connectDB()

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Routes
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/user', userRoutes);

// Routes   
app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});