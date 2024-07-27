
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const signupUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const { error } = signupSchema.validate({ name, email, password });
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send("User already exists");
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const payload = {
            user: {
                id: newUser.id
            }
        };

        await jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            return res.status(201).cookie('token', token, { httpOnly: true }).send({ token });
        })

    } catch (err) {
        console.log(err);
        throw err;
    }

}

const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { error } = loginSchema.validate({ email, password });
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User does not exist");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid password");
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            return res.status(201).cookie('token', token, { httpOnly: true }).send({ token });
        });

    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    signupUser,
    signinUser,
}