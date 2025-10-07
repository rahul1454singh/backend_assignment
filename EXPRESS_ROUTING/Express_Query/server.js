
/* 
Express - Static Route Based on Query bookmark_border
Create a static route /greet that responds differently based on the value of the lang query parameter.



Create a route /greet.
Supported languages:
en → "Hello"
fr → "Bonjour"
hi → "Namaste"
Default: Respond with "Hello (Default)" for missing or unsupported languages.


Example

/greet?lang=en   -->  Hello
/greet?lang=hi   -->  Namaste
*/














const express= require('express');
const app = express();


const router = require('./routers/Query ')

 app.use('/',router);










app.listen(3000,()=>{
    console.log('Server started..!')
})