

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}-${month}-${year}`;
//console.log(currentDate); // "17-6-2022"


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
        },
        createdDate:{
            type:DataTypes.STRING,
            defaultValue:currentDate
        }
    })
    
    return Order;
    
}


