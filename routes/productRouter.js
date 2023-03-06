 const productController  =require('../controllers/productController.js');
 const reviewController  =require('../controllers/reviewController');
const Auth = require('../middleware/auth')
 const router  = require('express').Router()
// product router
 router.post('/addproduct', productController.upload, productController.addProduct)
 router.get('/allproducts', productController.getAllProducts)
 router.get('/published', productController.getPublishedProduct)
 router.get('/singleproduct/:id', productController.getOneProduct)
 router.put('/updateproduct/:id',productController.upload, productController.updateProduct)
 router.delete('/deleteproduct/:id', productController.deleteProduct)
// adding product image
router.post('/addproductimage',productController.slide_photo,productController.addProductImage)

//  review router
router.post('/addReview/:productid',reviewController.addReview)
router.get('/allReviews',reviewController.getAllReviews)

router.get('/getProductReviews/:id',productController.getProuductReviews) 



 module.exports =  router