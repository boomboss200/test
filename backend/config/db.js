const mongoose = require("mongoose")
const colors = require("colors")

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo db is connected".bgGreen.white)
    }catch (error){
        console.log("Mongo Db server issue".bgRed.white)
    }
}

module.exports = connectDB;