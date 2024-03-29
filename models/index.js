const dbConfig =  require('../config/dbConfig.js');
const {Sequelize,DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host:dbConfig.HOST,
        dialect:dbConfig.dialect,
        operatorsAliases:false,

        pool:{
            max:dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle
        }
    }
)



sequelize.authenticate()
.then(()=>{
    console.log("connected")
})
.catch(err =>{
    console.log('Error',err)
})


const db = {

}

db.Sequelize = Sequelize;
db.sequelize =  sequelize


// table creating
db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)
db.users = require('./userModel.js')(sequelize,DataTypes)
db.orders = require('./orderModel.js')(sequelize,DataTypes)
// db.paymentdetails = require('./paymentdetailsModel.js')(sequelize,DataTypes)
db.orderitems = require('./orderitemModel.js')(sequelize,DataTypes)
db.shippingaddress = require('./shippingaddressModel.js')(sequelize,DataTypes)
db.productimages = require('./productimageModel.js')(sequelize,DataTypes)
db.admins = require('./adminModel.js')(sequelize,DataTypes)
db.discounts  = require('./discountModel.js')(sequelize,DataTypes)
db.discountitems  = require('./discountitemModel.js')(sequelize,DataTypes)
db.codes =  require('./codeModel')(sequelize,DataTypes)

db.sequelize.sync({
    force:false
})
.then(()=>{
    console.log("yes re-sync done!")
})

// one to one relationship between shipping address and order

db.orders.hasOne(db.shippingaddress,{
    foreignKey:'order_id',
    as:'shippingaddress'
})

db.shippingaddress.belongsTo(db.orders,
    {
        foreignKey:'order_id',
        as:'order'
    })


// 1 to many Relation

db.products.hasMany(db.reviews,{
    foreignKey:'product_id',
    as:'review'
})

db.reviews.belongsTo(db.products,
    {
        foreignKey:'product_id',
        as:'product'
    })

// 1 to many relation between orders and users
db.users.hasMany(db.orders,{
    foreignKey:'user_id',
    as:'order'

})

db.orders.belongsTo(db.users,{
    foreignKey:'user_id',
    as:'user'
})


// one to many relation between orders and orderitems
db.orders.hasMany(db.orderitems,{
    foreignKey:'order_id',
    as:'orderitem'
})

db.orderitems.belongsTo(db.orders,{
    foreignKey:'order_id',
    as:'order'
})

// one to many relation between product and image
db.products.hasMany(db.productimages,{
    foreignKey:'product_id',
    as:'productimage'
})

db.productimages.belongsTo(db.products,
    {
        foreignKey:'product_id',
        as:'product'
    })
// payment and order relationship
// db.orders.hasMany(db.paymentdetails,{
//     foreignKey:'order_id',
//     as:'paymentdetails'
// })

// db.paymentdetails.belongsTo(db.orders,{
//     foreignKey:'order_id',
//     as:'order'
// })

// one to many relation between product and discount
db.discounts.hasMany(db.discountitems,{
    foreignKey:'discount_id',
    as:'discountitem'
})

db.discountitems.belongsTo(db.discounts,
    {
        foreignKey:'discount_id',
        as:'discount'
 })

//  one to many relationship between discountitem and products
 db.discountitems.belongsTo(db.products,{
    foreignKey:'product_id',
    as:'product'
})

db.products.hasMany(db.discountitems,
    {
        foreignKey:'product_id',
        as:'discountitem'
 })



module.exports = db