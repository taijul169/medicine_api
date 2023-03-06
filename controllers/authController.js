
// const User =  require('../models/userModel')
const db =  require('../models')
const {StatusCodes} = require('http-status-codes')
const User =db.users

// register user functionality-------------------------------------
const register = async( req,res, next) =>{
        const {firstname, email, password,lastname,phone,gender,dateofbirth,address } = req.body

        if(!firstname || !phone  || !password){
            res.status(StatusCodes.BAD_REQUEST).json({ 
                msg:"Please Provide all values"
             })
        }
        if(phone.length !=11){
            res.status(StatusCodes.BAD_REQUEST).json({ 
                msg:"Invalid Phone Number"
             })
        }
        const userAlreadyExists  = await User.findOne({where:{phone:phone}})
        if(userAlreadyExists){
            res.status(StatusCodes.BAD_REQUEST).json({ 
               msg:"User already exist!!"
            })
        }
        const user =  await  User.create({firstname, email, password,lastname,phone,gender,dateofbirth,address })

        const token =   user.createJWT()
        res.status(StatusCodes.CREATED).json({user,token})
}


// loging functionality--------------------------------------------
const login = async( req,res) =>{
    const {phone,password }  = req.body;
    if(!phone || !password){
        res.status(StatusCodes.BAD_REQUEST).json({ 
            msg:"Please Provide all values"
      })
    }
    const user  = await User.findOne({where:{phone,password}})
    if(!user){
        res.status(StatusCodes.BAD_REQUEST).json({ 
            msg:"Invalid Credentials"
      })
      
    }
    // const isPasswordCorrect  =  await user.comparePassword(password)
    // if(!isPasswordCorrect){
    //     throw new UnAuthenticatedError('Invalid Credentials')
    // }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({user,token})
}


// update user functionality----------------------------------------------
const updateUser = async( req,res) =>{

    const {email, name, lastName, location} = req.body
    if(!email || !name || !lastName || !location){
        throw new  BadRequestError('Please provide all values')
    }
    const user  = await  User.findOne({_id:req.user.userId})
    user.email =  email
    user.name =  name
    user.lastName =  lastName
    user.location =  location

    await user.save()
    const token = user.createJWT()
    
    res.status(StatusCodes.OK).json({user,token, location:user.location})
    res.send('update user')
}

module.exports = { register, login, updateUser }