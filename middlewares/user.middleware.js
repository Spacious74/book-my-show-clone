const User = require('../models/User');


const validateUser = async(req,res,next)=>{

    const user = req.body;
    if(!user.name || !user.email || !user.password || !user.userId){
        res.status(400).send({
            message : "Please provide required information!"
        })
        return;
    }



    const isAlreadyExist = await User.findOne({userId : user.userId});
    if(isAlreadyExist){
        res.status(400).send(
            {
                message : "User already exists! please provide another userId to Register"
            }
        )
        return;
    }

    const isValidType = user.userType
    if(isValidType !== 'CUSTOMER'){
        res.status(400).send({
            message : "Invalid user type!"
        })
        return;
    }

    next();

}

module.exports = {validateUser}
