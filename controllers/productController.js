const db = require('../models')
const {StatusCodes} = require('http-status-codes')
// create main Model

const Product =db.products
const Discountitem = db.discountitems
const Discount = db.discounts
// const Review = db.reviews
// const Productimage =  db.productimages

// image upload
const multer  = require('multer')
const path =  require('path')

// main work

// 1. create product

const addProduct = async (req,res)=>{
    try {
        if(!req.file || !req.body.price  || !req.body.stock || !req.body.category){
            res.status(StatusCodes.BAD_REQUEST).json({ 
                msg:"Please Provide all values"
             })
        }
        let info ={
            image:req.file.path,
            name:req.body.name,
            price:req.body.price,
            stock:req.body.stock,
            description:req.body.description,
            category:req.body.category,
            strength:req.body.strength,
            genericname:req.body.genericname,
            company:req.body.company,
            published:req.body.published ? req.body.published :true,
        }
        const product = await Product.create(info)
        res.status(StatusCodes.CREATED).json({product})
    
        console.log(product)
    } catch (error) {
        console.log("error",error)
        res.status(StatusCodes.BAD_REQUEST).json({error})
    }

    
}

// add product slide photos
const addProductImage =  async (req,res)=>{
    try {
        let info ={
            images:req.files,
            product_id:req.body.product_id
        }
        if(info){
            if(info.images.length>0){
                info.images.map((item, index)=>{
                     Productimage.create({image:item.path,product_id:info.product_id})
                })
                res.status(200).send(info)
            }
        }
    } catch (error) {
        res.status(400).send({ error})
    }
    

}


// 2 get all products

const getAllProducts = async (req,res) =>{
    try {
        let products =  await Product.findAll({
            include:[
                {
                    model:Discountitem,
                    as:'discountitem',
                    required:false,
                    include:[{
                        model:Discount,
                        as:'discount',
                        attributes:['id','discount_percent','isactive']
                    }],
                    attributes:['id','isactive']

                },
            ]
        })
        for(var i=0;i< products.length;i++){
            products[i].image = `${req.protocol+"://"+req.headers.host}/${products[i].image}`
        }
         res.status(200).send(products)
    } catch (error) {
        res.status(200).send(error)
    }
   

   
}

// 3 get single product

const getOneProductOLD = async (req,res) =>{

    let id = req.params.id
    let product =  await Product.findOne({include:[{
        model:Review,
        as:'review'
    },{
        model:Productimage,
        as:'productimage',
        attributes: ['image']
    }], where:{id:id}})

    product.image = `${req.protocol+"://"+req.headers.host}/${product.image}`
    product.productimage.map((item,index)=>{
        item.image = `${req.protocol+"://"+req.headers.host}/${item.image}`
        return item
    })
    res.status(200).send(product)

    
}

const getOneProduct = async (req,res) =>{

    let id = req.params.id
    let product =  await Product.findOne({where:{id:id}})
    product.image = `${req.protocol+"://"+req.headers.host}/${product.image}`
    res.status(200).send(product)

    
}
// 4 single product update

const updateProduct = async (req,res) =>{
    let id = req.params.id
    if(!req.body.price  || !req.body.stock || !req.body.category){
        res.status(StatusCodes.BAD_REQUEST).json({ 
            msg:"Please Provide all values"
         })
    }
    if(req.file){
        let info ={
            image:req.file.path,
            name:req.body.name,
            price:req.body.price,
            stock:req.body.stock,
            description:req.body.description,
            category:req.body.category,
            strength:req.body.strength,
            genericname:req.body.genericname,
            company:req.body.company,
        }
        const product = await Product.update(info,{where:{id:id}})
        res.status(200).send(product)
        console.log(product)
        
    }else{
        const product = await Product.update(req.body,{where:{id:id}})
        res.status(200).send(product)
        console.log(product)
    }
    
}
// single shop update online/offline status
const updateProuductStatus = async (req,res) =>{
    let id = req.params.id;
    let status = req.params.status;
    const productstatus = await Product.update(
            {
                published:status
            },{where:{id:id}})
     console.log("productstatus status update:",productstatus)      
     res.status(200).send(productstatus)
 
   } 

// 5 delete product by id

const deleteProduct = async (req,res) =>{

    let id = req.params.id
   await Product.destroy({where:{id:id}})
     res.status(200).send("Product is deleted")

}

// 6 get published product 

const getPublishedProduct = async (req,res) =>{

   
   let products =  await Product.findAll({
       where:{published:true},
       include:[
        {
            model:Discountitem,
            as:'discountitem',
            required:false
        },

]
   })
    products =   products.map((product, key)=>{
        
     return  product.image  = `${req.protocol+"://"+req.headers.host}${product.image}`
   })
   res.status(200).send(products)

}


// 7. connect one to many relation Product and reviews
const getProuductReviews  =  async (req,res) =>{
    let id =  req.params.id
    const data = await Product.findAll({
       include:[{
           model:Review,
           as:'review'
       }],
       where: {id:id}
    })

    res.status(200).send(data)
}


// Upload image controller

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        if(file){
            cb(null,'Images')
        }
        
    },
    filename:(req,file,cb)=>{
        if(file){
            cb(null,Date.now() + path.extname(file.originalname))
        }
        
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|webp/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

// image slide photos 
const slide_photo = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|webp/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).array('images',3)


module.exports ={
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProuductReviews,
    upload,
    slide_photo,
    addProductImage,
    updateProuductStatus

    
}