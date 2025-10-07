



/*Single File Upload (Image Upload) bookmark_border
Create an Express.js application that allows users to upload a single profile picture using Multer.

Restrict file type to .jpg and .png.
Save uploaded files in an /uploads folder.
Return a success message with the file name and path in the response.
If a file type is invalid, return an error message.
 */



const express= require('express');
const app = express();
const Routes= require('./routes/single');


app.use('/',Routes);


app.listen(3000,()=>{
    console.log('Server started..!');
})