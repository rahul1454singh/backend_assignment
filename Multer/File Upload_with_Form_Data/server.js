/*File Upload with Form Data bookmark_border
Create an Express.js API where a user can submit:

Name, email, and phone number (form fields)
Resume file (PDF only) using Multer.
Save resumes in /uploads/resumes.
Store form data along with file path in a JSON file or database.
Return a success response containing both form data and file information.
 */




const express = require('express');
const app = express();
const formDetail= require('./routes/form');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',formDetail);



app.listen(3000,()=>{
    console.log('Server started..!')
})