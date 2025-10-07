const express = require('express');
const app = express();

const path = require('path');


const post = require('./routes/posts');
const comment = require('./routes/comments')


app.use('/',post);
app.use('/',comment);




















app.listen(3000,()=>{
    console.log('Server Started..')
})