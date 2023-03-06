
module.exports =  (sequalize, DataTypes) =>{
    const Orderitem = sequalize.define('orderitem',{
        order_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        product_id:{
            type:DataTypes.STRING,
            allowNull:false
        },
        quantity:{
            type:DataTypes.DECIMAL,
            allowNull:false
        },
        price:{
            type:DataTypes.DECIMAL,
            allowNull:true
        }

    })
    
    return Orderitem;
    
}


