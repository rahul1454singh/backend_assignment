const express = require('express');
const router = express.Router();



const comment= [
  { "commentId": 1, "comment": "Great post! Really enjoyed reading it." },
  { "commentId": 2, "comment": "Thanks for sharing this information." },
  { "commentId": 3, "comment": "I totally agree with your points." },
  { "commentId": 4, "comment": "This was very helpful, keep it up!" },
  { "commentId": 5, "comment": "Interesting perspective, made me think." }
]



router.get('/comment',(req,res)=>{
    res.json(comment);

})
router.get('/comment/:commentId',(req,res)=>{
    const foundcomment = comment.find(c=>c.commentId == req.params.commentId);
    if(foundcomment){
        res.json(foundcomment);
    }
    else{
        res.status(404).json({Message:-'not found any comment'})
    }
})




















module.exports = router;