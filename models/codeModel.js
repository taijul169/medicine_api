

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}-${month}-${year}`;
//console.log(currentDate); // "17-6-2022"

// 6digit random number generate
const sec_code =Math.floor(100000 + Math.random() * 900000)
module.exports =  (sequalize, DataTypes) =>{
    const Code = sequalize.define('code',{
        phone:{
            type:DataTypes.STRING,
            allowNull:false
        },
        code:{
            type:DataTypes.DECIMAL,
            defaultValue:sec_code
        },
        name:{
            type:DataTypes.STRING,
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
    
    return Code;
    
}


