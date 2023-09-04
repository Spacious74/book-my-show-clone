const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    username : String,
    email : String,
    phone : Number,
    movieName : String,
    theatreName : String,
    theatreId : String,
    movieId : String,
    seats : [],
    price : Number,
    date : String,
    time : String

});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
