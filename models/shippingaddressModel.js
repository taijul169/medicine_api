

module.exports =  (sequalize, DataTypes) =>{
    const Shippingaddress = sequalize.define('shippingaddress',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        order_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false
        },
        region:{
            type:DataTypes.STRING,
            
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false
        },
        area:{
            type:DataTypes.STRING,
            allowNull:false
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        note:{
            type:DataTypes.TEXT,
        },
    })

    return Shippingaddress;
}