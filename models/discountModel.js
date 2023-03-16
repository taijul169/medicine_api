

module.exports =  (sequalize, DataTypes) =>{
    const Discount = sequalize.define('discount',{
        discount_name:{
            type:DataTypes.STRING
        },
        discount_percent:{
            type:DataTypes.INTEGER
        },
        description:{
            type: DataTypes.TEXT
        },
        product_id:{
            type: DataTypes.INTEGER
        },
        isactive:{
            type: DataTypes.BOOLEAN,
            defaultValue:1
        },
        discount_type:{
            type: DataTypes.STRING
        }
       
    })

    return Discount;
}