const express = require('express');
const router = (express.Router());
const path= require('path');

const multer = require('multer');


const fileFilter = (req,file,cb)=>{
const ext = path.extname(file.originalname).toLowerCase();
if(ext === '.jpg' || ext === '.png'){
    cb(null, true);
}else{
    cb(new Error("Only .jpg and .png files are allowed!"),false);
}
console.log('file  ext checked');
}


const upload = multer({dest:'uploads/',fileFilter});


router.get('/upload',(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/single.html"))
})


router.post('/upload',upload.single('image'),(req,res)=>{
res.send(`
    
  <h2>Image uploaded successfully!</h2>
  <p><strong>File Name:</strong> ${req.file.originalname}</p>
  <p><strong>File Path:</strong> /uploads/${req.file.filename}</p>

`);

console.log('file detail',req.file)
})




module.exports=router;