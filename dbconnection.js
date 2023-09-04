const mongoose = require('mongoose');

const dbConnection = async()=>{

    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connection established")
    }catch(err){
        console.log("Error in connecting mongo_db : ",err)
    }

}

module.exports = dbConnection