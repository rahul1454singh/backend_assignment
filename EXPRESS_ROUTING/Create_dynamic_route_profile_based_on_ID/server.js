const express= require('express');
const app = express();
app.use(express.json());


const users = [

{ id: '101', name: 'Alice', age: 25 },
{ id: '102', name: 'Bob', age: 30 },
{ id: '103', name: 'Charlie', age: 22 }
]

app.get('/user/:id',(req,res)=>{


    const userId = req.params.id;
    const  user = users.find(user=>user.id === userId)
    if(user){
        res.send(user)
    }else{
        res.status(404).json({Message:'user not found'})
    }

})



















app.listen(3000,()=>{
    console.log("Server Started..!")
})