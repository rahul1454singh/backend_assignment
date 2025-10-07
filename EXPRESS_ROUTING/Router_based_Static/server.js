const express = require('express');
const app = express();
const path = require('path');



app.get('/services',(req,res)=>{
    res.sendFile(path.join(__dirname,'pages','services.html'))
})


app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'pages','contact.html'))
})


app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'pages','about.html'))
})












app.listen(3000,(req,res)=>{
    console.log("Server Started..!")
})