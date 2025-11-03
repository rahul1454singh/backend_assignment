const express = require("express")
const http = require("http") // 1
const {Server}  = require("socket.io") //3
const app = express()

const server = http.createServer(app) //2

const io = new Server(server)// 4



app.use(express.static("public"))
// app.use(express.json())
let messages = []


// 6
io.on("connection", (socket)=>{
    console.log("socket connected...")
    // io.emit("notify", socket.id + "new user connected")
    io.emit("getAllMessages", messages)

    socket.on("sendMessage", (data)=>{
        messages.push(data)
        io.emit("getAllMessages", messages)
    })
})

// app.post("/sendMessage", (req, res)=>{
//     messages.push(req.body.message)
//     res.json(req.body)
// })

// app.get("/getAllMessages", (req, res)=>{
//     res.json(messages)
// })



// 5
server.listen(3000, ()=>{
    console.log("server started...")
})


