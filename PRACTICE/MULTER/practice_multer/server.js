const express= require("express");
const app= express();
const multer = require("multer");

app.set("view engine",'ejs');


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    }
    
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype==="image/jpeg" || file.mimetype==="image/png"||file.mimetype==="application/pdf"){
        cb(null,true);
    } else{
        cb(new Error('Only jpg,png and pdf are allowed'),false);
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
})

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/uploads',upload.array("file",4),(req,res)=>{
    if(!req.file || req.file.length===0){
        return res.status(400).send(`no files uploads  `)
    }
    res.send(req.files);
})

app.use((error,req,res,next)=>{
    if(error instanceof multer.MulterError){
        return res.status(400).send(`multer error ${error.message}`);
    } else if(error){
         return res.status(500).send(`Something went wrong: ${error.message}`);
    }
    next();
})


app.listen(3000,()=>{
    console.log("Server started..!")
})