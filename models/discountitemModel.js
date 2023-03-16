

module.exports =  (sequalize, DataTypes) =>{
    const Discountitem = sequalize.define('discountitem',{
        discount_id:{
            type:DataTypes.INTEGER
        },
        product_id:{
            type:DataTypes.INTEGER
        },
        isactive:{
            type: DataTypes.BOOLEAN,
            defaultValue:1
        },
        discount_type:{
            type: DataTypes.STRING
        },
        
       
    },{
        indexes: [
            {
                unique: true,
                fields: ['product_id', 'discount_id'],
                name:'unique_product_id_discount_id'
            },
           
        ]
    }
  
    )

    return Discountitem;
}