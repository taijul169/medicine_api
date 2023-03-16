const db = require('../models')

const Discount = db.discounts
const Discountitem = db.discountitems
const Products = db.products
// function
// 1.add discount
const addDiscount = async(req,res)=>{
    try {
        let data = {
            discount_name:req.body.discount_name,
            discount_percent:req.body.discount_percent,
            discount_type:req.body.discount_type,
            description:req.body.description
        }
      
        const alreadyexist = await Discount.findOne({where:{discount_name:data.discount_name,discount_percent:data.discount_percent,discount_type:req.body.discount_type}})
        console.log("already exist:",alreadyexist)
        if(alreadyexist){
            res.status(400).send({msg:"already exist!!"})
        }else{
            const discount = await Discount.create(data)
            res.status(200).send(discount)
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
   
}

// 2.Get all discount

const getAllDiscounts =  async (req,res) =>{
    const discounts =  await Discount.findAll()
    res.status(200).send(discounts)
}
// get single discount
const getSingleDiscount =  async (req,res) =>{
    const discount =  await Discount.findAll({where:{id:req.params.id}})
    res.status(200).send(discount)
}

// update single discount
const updateDiscount =  async (req,res)=>{
    try {
        const updateDiscount = await Discount.update({
            discount_name:req.body.discount_name,
            discount_percent:req.body.discount_percent,
            discount_type:req.body.discount_type,
            description:req.body.description,
            isactive:req.body.isactive,  
        },{where:{id:req.params.id}})
    
        res.status(200).send(updateDiscount)
    } catch (error) {
        console.log("error",error)
        res.status(400).send(error)
    }
  
}

// add item to discount
const addUserToDiscount = async(req,res)=>{
     console.log("req.body:",req.body)
    try {
        let data = {
            discount_id:req.body.discount_id,
            product_id:req.body.product_id,
            discount_type:req.body.discount_type,
        }
        const alreadyexist = await Discountitem.findOne({where:{discount_id:data.discount_id,product_id:data.product_id}})
        console.log("already exist:",alreadyexist)
        if(alreadyexist){
            res.status(400).send({msg:"already exist!!"})
        }
        else{
            const discount = await Discountitem.create(data)
            res.status(200).send(discount)
        }
       
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

const getItemByDiscountID = async(req,res)=>{

    const items =  await Discountitem.findAll({where:{discount_id:req.params.id},
        attributes:['discount_id'],
        include:[
            {
                model:Products,
                as:'product',
            },

    ]})
   const discount = await Discount.findOne({where:{id:req.params.id}})
    res.status(200).send({items,discount})
}

module.exports = {
    addDiscount,
    getAllDiscounts,
    getSingleDiscount,
    updateDiscount,
    addUserToDiscount,
    getItemByDiscountID
}
    
