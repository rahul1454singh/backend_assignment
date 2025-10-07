const express= require('express');
const router = express.Router();
const path = require('path');

const User =[
  { "userId": "1", "userName": "Alice" },
  { "userId": "2", "userName": "Bob" },
  { "userId": "3", "userName": "Charlie" },
  { "userId": "4", "userName": "David" },
  { "userId": "5", "userName": "Eva" },
  { "userId": "6", "userName": "Frank" },
  { "userId": "7", "userName": "Grace" },
  { "userId": "8", "userName": "Hannah" },
  { "userId": "9", "userName": "Ian" },
  { "userId": "10", "userName": "Jane" }
]




router.get('/user',(req,res)=>{
res.json(User);
})




router.get('/user/:id',(req,res)=>{
 const user = req.params.id;
 const users = User.find(users=>users.userId==user)
 if(users){
    res.json(users)
 }else{
    res.status(404).json({erro:"no users"});
 }

})

























module.exports= router;