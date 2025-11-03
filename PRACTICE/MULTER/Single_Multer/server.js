const express= require("express");
const app = express();

const  multer = require("multer");
const path = require('path');

app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const storage = multer.diskStorage({

       destination:(req,file,cb)=>{
        cb(null,'./uploads')
       },

       filename:(req,file,cb)=>{

        const newFileName = Date.now()+ path.extname(file.originalname);
                 cb(null,newFileName);
       },


})
const fileFilter = (req,file,cb)=>{
       if(file.mimetype =='image/jpeg' || file.mimetype=='image/png' ){
                 cb(null,true);
       }
       else{
            cb(new Error("Only image are allowed!"),false)
       }
}

const upload = multer({
  storage:storage,

  limits :{
      fileSize: 1024*1024*10,
  },
  fileFilter: fileFilter 

  
})


app.get('/',(req,res)=>{
    res.render('single');
})


app.post('/upload',upload.single("avater"),(req,res)=>{
    res.send(req.file);
    console.log(req.file);
})




app.listen(3000,()=>{
    console.log("Server Started..!")
})