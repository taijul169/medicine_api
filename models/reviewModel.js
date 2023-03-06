

module.exports =  (sequalize, DataTypes) =>{
    const Review = sequalize.define('review',{
       
        rating:{
            type:DataTypes.INTEGER
        },
        description:{
            type: DataTypes.TEXT
        },
        product_id:{
            type: DataTypes.INTEGER
        }
       
    })

    return Review;
}