const user = require('../models/user.model');

exports.createUser  = async (req, res) => {  
    try {
        const user = await user.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
};

module.exports = {
    createUser
};  };   