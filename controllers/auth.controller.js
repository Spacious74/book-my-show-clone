const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
app.use(bodyParser.json());
const User = require("../models/User");
const secret_key = "fjqo283jf23sc"
const login = async(req,res)=>{

    const userBody = req.body;
    const userLogin = await User.findOne({
        email  : userBody.email
    });
    const token = jwt.sign({id : userLogin._id}, secret_key, {
        expiresIn : 86400
    })
    if(userLogin){
        res.status(200).send({
            message : "User login successful",
            userId : userLogin._id,
            username : userLogin.username,
            email : userLogin.email,
            phone : userLogin.phone,
            token : token
        });
    }
}

const getUserInfo = async (req,res)=>{
    const userId = req.params.userId;
    try {
        const user = await User.findOne({_id : userId});
        res.status(200).send({
            user
        })
    } catch (error) {
        res.status(400).send({
            message : "Error  : " + error.message
        })
    }
}

const register = async(req,res)=>{
    const userBody = req.body;
    try { 
        const userCreated = await User.create({
            username : userBody.username,
            phone : userBody.phone,
            email : userBody.email,
            password : bcrypt.hashSync(userBody.password, 10),
        })
        res.status(200).send({
            message : "User registered successfully.",
            username : userCreated.username,
            phone : userCreated.phone,
            email : userCreated.email
        })
    } catch (error) {
        res.status(400).send({
            message : "Error  : " + error.message
        })
    }
}




module.exports = {
    register,
    login,
    getUserInfo
}