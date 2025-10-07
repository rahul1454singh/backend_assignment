const express = require("express");
const ejs = require("ejs");
const path = require('path');
const {ObjectId}= require("mongodb");
const {connectMongo}= require("./utils/connectDb");
const app = express();
app.use(express.urlencoded());
app.set("view engine","ejs");
app.set("views",__dirname + "/views");

let db;
connectMongo()
.then(data => db = data);

/* show All Data*/
app.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalStudents = await db.collection("students").countDocuments();
    const totalPages = Math.ceil(totalStudents / limit);

    const students = await db.collection("students")
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    res.render("student", {
      students,
      condition: '',
      marks: '',
      currentPage: page,
      totalPages
    });
  } catch (error) {
    res.send(error);
  }
});

/*for Add */
app.post("/add-student", async (req, res)=>{
    try {
        let {name, section, marks} = req.body;
       await db.collection("students").insertOne({name, section, marks: Number(marks)})
       res.redirect("/")
    } catch (error) {
        res.send(error)
    }
})

/* for greather than , smaller than and equaltoo */
app.get("/filter", async (req, res) => {
  try {
    const { condition , marks, page } = req.query;
    const limit = 5;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * limit;

    let query = {};
    if (marks) {
      const markNum = Number(marks);
      if (condition === "gt") query.marks = { $gt: markNum };
      else if (condition === "lt") query.marks = { $lt: markNum };
      else if (condition === "eq") query.marks = markNum;
    }

    const totalStudents = await db.collection("students").countDocuments(query);
    let totalPages = ((totalStudents + limit - 1) / limit) >> 0;

    const students = await db.collection("students")
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    res.render("student", {
      students,
      condition: condition || '',
      marks: marks || '',
      currentPage,
      totalPages
    });

  } catch (error) {
    res.send(error);
  }
});

/* for delte button*/
app.delete("/delete/:id", async (req, res)=>{
    console.log(req.params.id)
    await db.collection("students").deleteOne({_id : new ObjectId(req.params.id)})
    res.redirect("/")
})

/* for edite*/
app.get("/update/:id",async (req, res)=>{
    try {
        console.log(req.params.id)
        let data = await db.collection("students").
        find({_id: new ObjectId(req.params.id)}).toArray()
        res.render("update", {student: data})
    } catch (error) {
        console.log("error")
    }
})

app.post("/Update-Student",async (req, res)=>{
    try {

       await db.collection("students").updateOne(
        {_id: new ObjectId(req.body.id)},
        {$set :{
            name: req.body.name,
            section: req.body.section,
            marks: Number(req.body.marks)
        }}
       ) 

       res.redirect("/")
    } catch (error) {
        console.log("error")
    }
})

app.listen(3000,()=>{
    console.log("server started..!")
})
