

module.exports =  (sequalize, DataTypes) =>{
    const Productinventory = sequalize.define('productinventory',{
        quantity:{
            type:DataTypes.DECIMAL,
            allowNull:false
        },
        product_id:{
            type:DataTypes.STRING,
            allowNull:false
        }

    })

    return Productinventory;
}