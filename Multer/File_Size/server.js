const express = require("express");
const app = express();
const path = require("path");

app.use('/uploads', express.static(path.join(__dirname, "uploads"))); 
app.use(express.static(path.join(__dirname, "views"))); 


const uploadRouter = require('./router/uplodeRouter'); 
app.use('/api', uploadRouter);

app.listen(3000, () => {
   console.log("Server start..!")
});
