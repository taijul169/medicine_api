

module.exports =  (sequalize, DataTypes) =>{
    const Productimage = sequalize.define('productimage',{
        product_id:{
            type: DataTypes.INTEGER
        },

       image:{
            type: DataTypes.STRING
        }
    })

    return Productimage;
}