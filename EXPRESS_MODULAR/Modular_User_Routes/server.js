/* Express - Modular User Routes bookmark_border
Build a modular Express.js application with separate route files for handling user-related requests.

Task

i. Create /routes/users.js:

GET /users – Return list of users.

GET /users/:id – Return a user by ID.

ii. Setup app.js to mount the route at /api/users.

iii. Create dummy user data array.*/










const express= require('express');
const app = express();
const router = require('./routers/user')
const path = require('path');

app.use('/api',router);



























app.listen(3000,()=>{
    console.log('Server started..!')
})