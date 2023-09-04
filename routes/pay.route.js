const express = require("express")
const payRouter = express.Router();
const controller = require('../controllers/pay.controller')

payRouter.post('/', controller.paymentDone);

module.exports = payRouter;