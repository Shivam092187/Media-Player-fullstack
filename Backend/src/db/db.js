const mongoose = require('mongoose')

async function connectDB(req,res) {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database not connected successfully", error);
    }
}

module.exports = connectDB;