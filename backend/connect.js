const mongoose = require("mongoose")
require("dotenv").config()

async function connectDB() {
    const password = process.env.MONGODB_PASS;
    mongoose.connect(`mongodb+srv://abhradeep:${password}@cluster0.5fu3vxu.mongodb.net/`)
    .then(() => console.log("DB connection successful"))
    .catch((err) => console.log("DB connection error", err))
}

module.exports = {connectDB}