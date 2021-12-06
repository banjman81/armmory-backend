const bcrypt = require("bcryptjs");
const User = require("../model/User");

async function createUser(req, res) {
    try {
        let salt = await bcrypt.genSalt(12);

        const createdUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role,
            username: req.body.username,
            password: req.body.password,
            age: req.body.age,
            phone: req.body.phone,
        });

        let hashedPassword = await bcrypt.hash(req.body.password, salt);

        createdUser.password = hashedPassword

        let savedUser = await createdUser.save();

        res.json({
        message: "success! user created please login",
        savedUser: savedUser,
        });
    } catch (err) {
        res.status(500).json({ message: "error", err });
        //return next(ErrorClass(err));
    }
}

module.exports = {
    createUser,
};