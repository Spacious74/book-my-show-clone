const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const app = express();
app.use(bodyParser.json());
const User = require("../models/User.js")




const getAllUsers = async (req, res) => {

    try {
        const users = await User.find();
        res.status(200).send({
            users
        });
    } catch (error) {
        res.staus(400).send({
            message : "Error : " + error.message
        })
    }

}

const getUserById = async (req, res) => {

    const id = req.params.userId;
    try {
        const user = await User.findOne({_id: id});
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({
            message : "Error : " + error.message
        })
    }

}


const createUser = async (req, res) => {
    const user = req.body
    try {
        const userCreation = await User.create({
            name : user.name,
            userId : user.userId,
            email : user.email,
            password : bcrypt.hashSync(user.password, 10),
            userType : user.userType,
            userStatus : user.userStatus
        });
        res.status(200).send({
            message : 'User created successfully',
            movie : userCreation
        });
    } catch (error) {
        res.status(400).send({
            message : "Error : " + error.message
        })
    }
}


const updateUser = async (req, res) => {

    const id = req.params.id;
    const userBody = req.body;
    try {
        const user = await User.findByIdAndUpdate({_id : id}, userBody);
        await user.save();
        res.status(200).send({
            message : "User updated successfully"
        })
    } catch (error) {
        res.status(400).send({
            message : "Error : " + error.message
        })
    }
    

}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete({_id : id});
        res.status(200).send({
            message : "User deleted successfully"
        })
    } catch (error) {
        res.status(400).send({
            message : "Error : " + error.message
        })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}