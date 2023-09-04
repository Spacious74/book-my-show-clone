const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const Payment = require('../models/PaymentDetails');
const Shows = require('../models/Showes')

const paymentDone = async (req, res) => {

    const pay = req.body;
    try {
        const show = await Shows.findOne({theaterId : pay.theatreId})
        show.movieList.map((show)=>{
            if(String(show.movieId) === pay.movieId){
                show.showTimingsAndSeats.map((s)=>{
                    if(s.showTime === pay.time){
                        pay.seatsArr.map((seat)=>{
                            s.bookedSeats.push(seat);
                        })
                    }
                })
            }
        });

        await show.save();
    
        const payment = await Payment.create(pay);
        res.status(200).send({
            message : "Payment Successfull"
        })

    }catch(err){
        res.status(400).send({
            message : "Error : " + err.message
        })
    }
}

module.exports = {
    paymentDone
}