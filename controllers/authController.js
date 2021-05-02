const User = require("../models/userModel")
const bcrypt = require("bcryptjs")


exports.signUp = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username: username,
            password: hashPassword
        });
        req.session.user = newUser;
        res.status(201).json({
            status: "success",
            data: {
                newUser
            }
        })
    } catch (error) {
        console.error(`error occured while saving ${username} user ${error}`);
        res.status(400).json({
            status: "failed"
        })
    }
}

exports.login = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const user = await User.findOne({
            username
        });
        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: `user ${username} not found`
            })
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            req.session.user = user;
            return res.status(201).json({
                status: "success"
            })
        } else {
            return res.status(400).json({
                status: "failed",
                message: "incorrect username or password"
            })
        }
    } catch (error) {
        console.error(`error occured while fetching ${username} user ${error}`);
        res.status(400).json({
            status: "failed"
        })
    }
}