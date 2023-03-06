

module.exports =  (sequalize, DataTypes) =>{
    const Product = sequalize.define('product',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        price:{
            type:DataTypes.INTEGER
        },
        stock:{
            type:DataTypes.INTEGER
        },
        description:{
            type: DataTypes.TEXT
        },
        published:{
            type:DataTypes.BOOLEAN
        },
        category:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image:{
            type:DataTypes.STRING
        },
        featured:{
            type:DataTypes.BOOLEAN,
            defaultValue:0
        },

    })

    return Product;
}