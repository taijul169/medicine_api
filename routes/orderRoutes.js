
const  express = require('express')
const router =  express.Router()

// import rateLimiter from 'express-rate-limit'
// const  apiLimiter  = rateLimiter({
//     windowMS:15 *60*1000, // 15 minutes
//     max:10,
//     message:'Too many requests from this IP address,please try again after 15 minutes'
// })
const { checkout,getSingleorder,getOrderlistbyuserid,getallorders,getallordersbystatus,orderstatusupdate,getallCustomers,getallorderbycustomerid,getBestCustomerByadmin,getallordersbydate}  = require('../controllers/orderController') 
const  authenticateUser =  require('../middleware/auth') 
router.route('/checkout').post(checkout)
router.route('/order/:id').get(getSingleorder)
router.route('/userid/:user_id').get(getOrderlistbyuserid)
router.route('/getallorders').get(getallorders)
router.route('/getallordersbystatus/:status').get(getallordersbystatus)
router.route('/orderstatusupdate/:status/:id').put(orderstatusupdate)
router.route('/getallcustomers').get(getallCustomers)
router.route('/getsinglecustomerorderhistory/:id').get(getallorderbycustomerid)
router.route('/findbestclient').post(getBestCustomerByadmin)
router.route('/getorderfortoday').get(getallordersbydate)



module.exports =  router

