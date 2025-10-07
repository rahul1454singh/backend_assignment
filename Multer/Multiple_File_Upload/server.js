/*Multiple File Upload bookmark_border
Build an Express.js route that allows a user to upload up to 5 images at once using Multer.

Store them in an /uploads/gallery folder.
Return an array of uploaded file names in the response.
If more than 5 files are uploaded, return an error.
Validate file extensions (.jpg, .png, .jpeg).
 */


const express= require('express');
const app = express();
const Router = require('./routes/array');

app.use('/',Router);

app.listen(3000,()=>{
    console.log('Server Start..!')
})