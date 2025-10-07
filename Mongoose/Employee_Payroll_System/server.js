const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./util/db");
const employeeRoutes = require("./router/employeeRoutes");

const app = express();
app.use(bodyParser.json());

connectDB();


app.use("/employees", employeeRoutes);

app.listen(300,()=>{
    console.log("Server Started..!");
})
