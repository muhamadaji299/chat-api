const userService = require('../services/userService');

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.json({
            message: 'Data user',
            users
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};