
/* HTTP - Serve Files from a Public Directory bookmark_border
Serve files such as images, CSS, or JS from a folder without Express.

Task:

a. Create a folder named public/.

b. When a user requests /public/style.css, serve public/style.css.

c. Handle 404 if file doesn't exist.

*/
const http = require('http');
const fs = require('fs');
const path = require('path');

const publicPath = path.join(__dirname, 'public');

const Server = http.createServer((req,res)=>{

const filePath = path.join(publicPath,req.url.replace("/public", ""));
fs.readFile(filePath,(err,data)=>{

 if(err){
        console.log('err')
    }
    else{
        res.end(data)
        console.log('Data send')
    }

})



})
Server.listen(3000,()=>{
    console.log('Serverstarted..!')
})


