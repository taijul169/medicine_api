
// const User =  require('../models/userModel')
const db =  require('../models')
const {StatusCodes} = require('http-status-codes');
const User =db.users
const Order =db.orders
const Orderitems =  db.orderitems;
const Shippingaddress =  db.shippingaddress;
const { Op } = require('sequelize');
const Sequelize =  require('sequelize')

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
                    name:item.name,
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
    let order =  await Order.findOne({include:[{
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
        
        const orders =  await Order.findAll({
            order: [
                ['id', 'DESC'],
            ],
        })
        if(orders){
            res.status(StatusCodes.OK).send(orders)
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:error.data.msg})
    }
}

const getallordersbystatus = async (req,res)=>{
    try {
        
        const orders =  await Order.findAll({
            where:{status:req.params.status},
            order: [
                ['id', 'DESC'],
            ],
        })
        if(orders){
            res.status(StatusCodes.OK).send(orders)
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:error.data.msg})
    }
}

// order status update
const orderstatusupdate = async (req,res)=>{
    try {
        
        const order =  await Order.update({status:req.params.status},{where:{id:req.params.id}})
        res.status(200).send(order)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({msg:error})
    }
}

const getallCustomers = async (req,res) =>{
    try {
        let data = await Order.findAll({
           attributes:['user_id'],
           include:[
            {
                model:User,
                as:'user',
                
            
            },
            
        ],
        })
        const key = 'user_id';

        const arrayUniqueByKey = [...new Map(data.map(item =>
          [item[key], item])).values()];
        
        //console.log(arrayUniqueByKey);
        arrayUniqueByKey.map((item,idx)=>{
              item.user.image  = `${req.protocol+"://"+req.headers.host}/${item.user.image}`
        })
        res.status(200).send(arrayUniqueByKey)
    } catch (error) {
        console.log("error",error)
    }

}

// single customer order history with customer info
const getallorderbycustomerid = async (req,res) =>{
    try {
        let id = req.params.id;
        let data = await User.findOne({
           where: { id:id },
           include:[
            {
                model:Order,
                as:'order',
                where:{user_id:id},
                attributes:['id','createdAt','status'],
                required:false,
               
            },
          ],
          
        })
        data.image = `${req.protocol+"://"+req.headers.host}/${data.image}`
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send({msg:'Not found'})
    }
 
}

// find best client 
  const getBestCustomerByadmin = async (req,res)=>{
       console.log("req.body",req.body)
       let order =  req.body.by_order
       let limit =  +(req.body.limit)
    try {
        let fromDate  =  new Date(req.body.fromDate)
        let toDate  =  new Date(req.body.toDate)
        if(!limit || !order){
          res.send({msg:"Required Field!"})
        }
        let condition = {
        };
        
        if(req.body.status){
            condition.status=req.body.status;
        }
        if(req.body.fromDate && req.body.toDate){
            condition.createdAt = {[Op.between] : [fromDate, toDate]}
        }

        let bestShops =  await Order.findAll({
            attributes:['user_id',[Sequelize.fn('count',Sequelize.col('user_id')),'count'],[Sequelize.fn('sum', Sequelize.col('total')), "total_amount"]],
            include:[
                {
                    model:User,
                    as:'user',
                    attributes:['id','firstname','phone','address']
                }
            ],
            group:['order.user_id'],
            order:Sequelize.literal(`${order} DESC`),
            where:condition,
            limit:limit
        })
        console.log('bestshop:',bestShops)
        res.status(200).send(bestShops)
    } catch (error) {
        console.log("best customer error",error)
    }
    
}

// getallordersbydate
const getallordersbydate = async(req,res)=>{
    const currentdate = new Date();
   const Orders =  await Order.findAll({where:{
        createdAt: currentdate
    }})

    res.status(200).send(Orders)

}



module.exports = { checkout,getSingleorder ,getOrderlistbyuserid,getallorders,getallordersbystatus,orderstatusupdate,getallCustomers,getallorderbycustomerid,getBestCustomerByadmin,getallordersbydate}