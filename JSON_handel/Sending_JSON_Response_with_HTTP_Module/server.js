const http = require('http');

const user = [
    {
         "name": "John Doe",
         "age": 30,
         "profession": "Developer"
}
]
const Server = http.createServer((req,res)=>{
if(req.url === '/api/user'){
    res.writeHead(200,{'content-type':'application/json'})
    // const data = user;
    res.end(JSON.stringify(user));
} else{
    res.statusCode =404;
    res.end('404- page not found')
}











})

Server.listen(3000,()=>{
    console.log('Server started..!')
})