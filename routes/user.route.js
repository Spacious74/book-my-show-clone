const express = require('express');
const userRouter = express.Router();
const userMiddleware = require('../middlewares/user.middleware')
const controller = require('../controllers/user.controller');


userRouter.get('/', controller.getAllUsers);
userRouter.get('/:userId', controller.getUserById);

userRouter.post('/',[userMiddleware.validateUser], controller.createUser);
userRouter.put('/:id', controller.updateUser);
userRouter.delete('/:id', controller.deleteUser);

module.exports = userRouter;