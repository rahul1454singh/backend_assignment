const http= require('http');
const querystring = require('querystring');

const fs= require('fs');

const Server = http.createServer((req,res)=>{

if(req.url=== '/form' && req.method==='GET'){
    fs.readFile('form.html','utf-8',(err,data)=>{
        if(!err){
            res.writeHead(200,{'content-type':'text/html'})
            res.write(data);
            res.end();
        }
    })
}


if(req.url==='/form' && req.method==='POST'){

let body = '';

req.on('data',(chunk)=>{
    body+= chunk.toString();
})
req.on('end',()=>{
    const formdata = querystring.parse(body);
    const formresponse = `
    <html>
    <body>
     <p>Thank you , ${formdata.name}.Your email is    ${formdata.email}              </p>

    </body>
    </html>

    `;
    res.writeHead(200,{'content-type':'text/html'})
    res.end(formresponse)
})

}

})


Server.listen(3000,()=>{
    console.log('Server Started..!')
})



