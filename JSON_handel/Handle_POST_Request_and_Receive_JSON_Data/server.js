const http = require('http');
const server = http.createServer((req,res)=>{


    if(req.url === '/submit'&& req.method==='POST'){
        let body= '';
        req.on('data',(chunk)=>{
            body+=chunk;
        })
        req.on('end',()=>{
            const JSONDATA = JSON.parse(body);
            const username = JSONDATA.username;
            res.writeHead(200,{'content-type':'text/plain'})
            res.end(`Received data for user:${username}`)

        })
    } 


    else{
        res.writeHead(404,{'content-type':'text/plain'});
        res.end('404 not found')
    }
    

})

server.listen(3000,()=>{
    console.log("server started..!")
})