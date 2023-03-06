const db = require('../models')


const Review = db.reviews

// function
// 1.add review
const addReview = async(req,res)=>{
    console.log("product id:",req.params.productid)

  let data = {
      rating:req.body.rating,
      description:req.body.description,
      product_id:req.params.productid
  }


  const review = await Review.create(data)
  res.status(200).send(review)
}

// 2.Get all Reviews

const getAllReviews =  async (req,res) =>{
    const reviews =  await Review.findAll({})
    res.status(200).send(reviews)
}

module.exports = {
    addReview,getAllReviews
}
    
