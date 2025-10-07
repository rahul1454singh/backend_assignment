
/* HTTP Module - Create a Basic API with POST and GET bookmark_border
Simulate a basic API with in-memory storage.

Task:

a. On POST /notes, accept JSON like { "note": "Buy milk" } and add it to an array.

b. On GET /notes, return all stored notes as JSON.

c. Return 400 if JSON is invalid. */





const http = require('http');
const array= [ ];
const Server = http.createServer((req,res)=>{


if(req.url === '/notes'&& req.method=== 'POST'){
    let body ='';
    req.on ('data',(chunk)=>{
        body+=chunk.toString();
    });
    req.on('end',()=>{
        const data = JSON.parse(body);
        array.push(data.note);
        res.writeHead(200,{'content-type': 'application/json'})
        res.end(JSON.stringify({Message:'you note is addded'}));
    })
} else if(req.url === '/notes'&& req.method=== 'GET'){
    res.writeHead(200,{'content-type': 'application/json'});
    res.end(JSON.stringify(array));
}
else{
    res.writeHead(404,{'content-type': 'text/plain'});
    res.end('404 Not fouhd')
}

})


Server.listen(3000,()=>{
    console.log('Server started..!')
})





