// Express - Serve Static HTML File Using Express bookmark_border
// Serve a static HTML page using Express from a public directory.

// Create a public folder.
// 2. Add home.html, style.css, and script.js files.

// 3. Use express.static() to serve the folder.

// 4. Create a route /home that sends the home.html file.





const express= require('express');
const app =express();
const Routes = require('./routes/homee');
const path =require('path')
app.use(express.static(path.join(__dirname,'public')))

app.use('/',Routes);








app.listen(3000,()=>{
    console.log('Server started..')
})