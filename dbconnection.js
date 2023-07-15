const mongoose = require('mongoose');

const dbConnection = async()=>{

    try{
        await mongoose.connect('mongodb://localhost:27017/bookMyShow_db');
        console.log("Database connection established")
    }catch(err){
        console.log("Error in connection db : ",err)
    }

}

module.exports = dbConnection