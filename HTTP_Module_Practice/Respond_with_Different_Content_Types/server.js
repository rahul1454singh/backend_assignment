/* HTTP Module - Respond with Different Content Types bookmark_border
Practice sending data in multiple formats based on request path.

Task:

a. /data.html → return HTML

b. /data.txt → return plain text

c. /data.json → return JSON

d. Set Content-Type accordingly in each case.*/




const http = require('http');

const server= http.createServer((req,res)=>{
    if(req.url==='/data.html'){
        res.writeHead(200,{'content-type':'text/html'});
        res.end(`
            <html>
            <body>
            <h1>This is simple html page</h1>
            
            </body>
            </html>
            `)
    } 
    
    else if(req.url === '/data.txt'){
        res.writeHead(200,{'content-type':'text/plain'});
        res.end(`hello this is a simple txt file `)
    }

    else if(req.url=== '/data.json'){
        res.writeHead(200,{'content-type':'application/json'})
        const data = { message: 'this is json file', type: 'json', status: 'success' };
        res.end(JSON.stringify(data));
    }



})
server.listen(3000,()=>{
    console.log('Server started..!')
})