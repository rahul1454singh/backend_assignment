const express= require('express');
const router = express.Router();


const product =[
  {
    "productId": "P101",
    "name": "Wireless Mouse",
    "category": "Electronics",
    "price": 799,
    "stock": 25
  },
  {
    "productId": "P102",
    "name": "Cotton T-Shirt",
    "category": "Clothing",
    "price": 499,
    "stock": 50
  },
  {
    "productId": "P103",
    "name": "Ceramic Coffee Mug",
    "category": "Home & Kitchen",
    "price": 299,
    "stock": 100
  },
  {
    "productId": "P104",
    "name": "Bluetooth Speaker",
    "category": "Electronics",
    "price": 1499,
    "stock": 15
  },
  {
    "productId": "P105",
    "name": "Running Shoes",
    "category": "Footwear",
    "price": 1999,
    "stock": 30
  }
]


router.get('/product',(req,res)=>{
    res.json(product);
})



router.get('/product/:category/:id',(req,res)=>{

const {category,id}= req.params;
const detail = product.find(product=>product.productId.toLowerCase() === id.toLowerCase() && product.category.toLowerCase() === category.toLowerCase())
  

if(detail){
    res.json(detail);
  }


  else{
    res.status(404).json({Message:-'not found product'})
  }

})
















module.exports= router;