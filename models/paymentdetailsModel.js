
module.exports =  (sequalize, DataTypes) =>{
    const Paymentdetails = sequalize.define('paymentdetails',{
        user_id:{
            type:DataTypes.STRING,
            allowNull:false
        },
        order_id:{
            type:DataTypes.STRING,
            allowNull:false
        },
        amount:{
            type:DataTypes.DECIMAL,
            allowNull:false
        },
        provider:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        shipping_address_id:{
            type:DataTypes.STRING,
            allowNull:true
        },
        payment_method:{
            type:DataTypes.STRING,
            allowNull:true
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue: 1,
        }


    })
    
    return Paymentdetails;
    
}


