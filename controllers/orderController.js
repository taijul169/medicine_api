
// const User =  require('../models/userModel')
const db =  require('../models')
const {StatusCodes} = require('http-status-codes');
const User =db.users
const Order =db.orders
const Orderitems =  db.orderitems;
const Shippingaddress =  db.shippingaddress;


const checkout =  async (req,res,next)=>{
    try {
         // const cart =[
    //     {id: 1,amount:5 ,name: 'poultry chicken', price: 220, stock: 15, description: 'this is latest product description'},
    //     {id: 2,amount:5 ,name: 'poultry fish', price: 450, stock: 15, description: 'this is latest product description'}
    // ]
    const {user_id,total,cart,paymentmethod,name,phone,region,city,area,address,note} = req.body
    const order  =  await Order.create({user_id,total,paymentmethod})
    
    if(order){
        cart.map((item,index)=>{
            Orderitems.create(
                {
                    order_id:order.id,
                    product_id:item.product_id,
                    quantity:item.quantity,
                    price:item.price,
                    strength:item.strength,
                    category:item.category,
                    genericname:item.genericname,
                    company:item.company,

                }
             )
             return item;
        })
        const shippingaddress = await Shippingaddress.create({name:name,order_id:order.id,phone:phone,region:region,city:city,area:area,note:note,address:address})
     
        res.status(StatusCodes.CREATED).json({order,shippingaddress})
    }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error})
    }
   

}

// get single order by order id
const getSingleorder =  async (req,res,next) =>{
    const id =  req.params.id;
    const order =  await Order.findOne({include:[{
        model:User,
        as:'user'
    },{
        model:Shippingaddress,
        as:'shippingaddress',
    },
    {
        model:Orderitems,
        as:'orderitem',
    }
], where:{id:id}})

    res.status(StatusCodes.OK).json({order})
}

// get order list by user id

const getOrderlistbyuserid = async (req,res,next) =>{
    try {
        const user_id = req.params.user_id;
        const orders =  await Order.findAll({where:{user_id}})
        if(orders){
            res.status(StatusCodes.OK).json({orders})
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:error.data.msg})
    }
    
   
}
const getallorders = async (req,res)=>{
    try {
        
        const orders =  await Order.findAll()
        if(orders){
            res.status(StatusCodes.OK).send(orders)
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:error.data.msg})
    }
}





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

module.exports = { checkout,getSingleorder ,getOrderlistbyuserid,getallorders}