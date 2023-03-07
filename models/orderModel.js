
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
        },
        status:{
            type:DataTypes.STRING,
            defaultValue: 'Pending',
        }
    })
    
    return Order;
    
}


