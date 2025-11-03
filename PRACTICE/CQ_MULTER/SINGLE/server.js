const express= require('express');
const app = express();
const path = require("path");
const multer= require("multer");
const { error } = require('console');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const storage = multer.diskStorage({
   destination: (req,file,cb)=>{
    cb(null,"./upload");
   },
})

const fileFilter = (req,file,cb)=>{
  if(file.mimetype == 'image/jpeg'|| file.mimetype == 'image/png'){
    cb(null,true);
  } else{
    cb(new Error('Only jpg and png are allowed..!'),false);
  }
}


const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
})


app.get('/',(req,res)=>{
    res.render('single');
})

app.post('/upload',upload.single("file"),(req,res)=>{
    if(!req.file){
       return res.send("<p>No file uploaded or invalid file type!</p>");
    }
     res.send(`
    <p><strong>File uploaded successfully!</strong></p>
    <p>File Name: ${req.file.filename}</p>
    <p>File Path: ${req.file.path}</p>
  `);
  console.log(file.filename,path);
})






app.listen(3000,()=>{
    console.log("Server Started..!");
})