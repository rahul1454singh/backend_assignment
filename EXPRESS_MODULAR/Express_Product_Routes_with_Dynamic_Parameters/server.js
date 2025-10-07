/* Express -Product Routes with Dynamic Parameters bookmark_border
Use dynamic routing and route parameters to fetch product information.

Task

1.       Create /routes/products.js:

GET /products – Return product list.
GET /products/:category/:id – Return specific product in a category.
2.       Setup app.js to use the route at /api/products.*/

const express = require('express');
const  app = express();
const product = require('./routers/product')


app.use('/',product);







app.listen(3000,()=>{
    console.log('Server started..!')
})