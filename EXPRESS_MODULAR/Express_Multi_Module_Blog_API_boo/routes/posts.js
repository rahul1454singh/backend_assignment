const express = require('express');
const router = express.Router();

const post = [
  { "postId": 1, "post": "Just finished my first Node.js project!" },
  { "postId": 2, "post": "Enjoying a sunny day at the park." },
  { "postId": 3, "post": "Learning Express routing — it’s fun!" },
  { "postId": 4, "post": "Coffee + coding = perfect morning." },
  { "postId": 5, "post": "Deployed my website today, feeling proud!" }
]



router.get('/post',(req,res)=>{
    res.json(post);
})

router.get('/post/:postid',(req,res)=>{
    const   foundpost = post.find(p=>p.postId == req.params.postid)
    if(foundpost){
        res.json(foundpost)
    }else{
        res.status(404).json({error:"no data"})
    }
})
















module.exports = router;