const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const cloudinary = require('cloudinary').v2;
const app = express();
const dotenv = require("dotenv");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

dotenv.config({path : './config/config.env'});
const port = process.env.PORT || 8080;

require('./dbconnection')();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET_KEY 
});


const mainRouter = require('./routes/allRoutes');
app.use(cors());
app.use(mainRouter);

app.listen(port , ()=>{
    console.log("Server listening on port " + port);
})