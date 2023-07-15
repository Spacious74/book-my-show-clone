const express = require("express")
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
require('./dbconnection')();
const port = 8080;
const mainRouter = require('./routes/allRoutes');


app.use(mainRouter);




app.listen(port , ()=>{
    console.log("Server listening on port " + port);
})