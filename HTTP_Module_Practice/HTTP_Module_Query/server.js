
/* HTTP Module - Query Parameter Handling bookmark_border
Handle dynamic values using query strings in the URL.

Task:

a. On route /greet?name=Rahul, respond with Hello, Rahul!.

b. If name is not provided, respond with Hello, Guest!.*/


// const http = require('http');
// const url = require('url');

// const server= http.createServer((req,res)=>{

//      if(req.url.startsWith('/greet')){
//         const parseUrl = url.parse(req.url,true);
//         const username = parseUrl.query.name || 'Guest';

//         res.end(`Heelo,${username}`)
//      }

// })

// server.listen(3000,()=>{
//     console.log('Server started..!')
// })

const url = require('url');
const http = require('http');
 const Server =  http.createServer((req,res)=>{

if(req.url.startsWith('/greet')){
    const parseUrl = url.parse(req.url,true);
    const username  = parseUrl.query.name || 'Guest';
    res.end(`hello, ${username}`);
}










 })
 Server.listen(3000,()=>{
    console.log('Server startedd.!')
 })