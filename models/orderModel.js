
module.exports =  (sequalize, DataTypes) =>{
    const Order = sequalize.define('order',{
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        total:{
            type:DataTypes.DECIMAL,
            allowNull:false
        },
        payment_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        shipping_address_id:{
            type: DataTypes.STRING,
            allowNull:true
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue: 1,
        }


    })
    
    return Order;
    
}


