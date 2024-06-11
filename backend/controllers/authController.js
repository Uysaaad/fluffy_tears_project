const User = require('../models/User');

// Register a new user
const signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password }); // Create a new user
        await user.save(); // Save the user to the database
        res.status(201).json(user); // Send a success response
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Login an existing user
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && user.password === password) {
            res.status(200).json(user); // Send a success response

        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { signup, login };