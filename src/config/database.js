const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected sucessfully : ");
    } catch (err) {
        console.error("Database connection error:", err);
        throw err;
    }
}

module.exports = connection;