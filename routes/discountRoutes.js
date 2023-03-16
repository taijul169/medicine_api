
const  express = require('express')
const router =  express.Router()

// import rateLimiter from 'express-rate-limit'
// const  apiLimiter  = rateLimiter({
//     windowMS:15 *60*1000, // 15 minutes
//     max:10,
//     message:'Too many requests from this IP address,please try again after 15 minutes'
// })
const { addDiscount,getAllDiscounts,updateDiscount,getSingleDiscount,addUserToDiscount,getItemByDiscountID}  = require('../controllers/discountController') 

router.route('/adddiscount').post(addDiscount);
router.route('/getalldiscount').get(getAllDiscounts);
router.route('/updatesinglediscount/:id').put(updateDiscount);
router.route('/getsinglediscount/:id').get(getSingleDiscount);
router.route('/additemtodiscount/:id').post(addUserToDiscount);
router.route('/getitemsbydiscountid/:id').get(getItemByDiscountID);

module.exports =  router

