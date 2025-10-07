// Question 
/*
1. Database Setup

Create a database CompanyDB.

Create two collections:

employees → fields:

empid (Number, unique)

name (String)

salary (Number)

deptid (Number)

departments → fields:

deptid (Number, unique)

deptname (String)

2. Routes
(A) Employee Routes

/seed-employees → Insert at least 6 sample employees into the employees collection.

/view-employees → Display all employees.

/add-employee/:id/:name/:salary/:deptid → Add a single employee using URL parameters.

/delete-employee/:id → Delete an employee with the given empid.

/delete-employee-lt/:id → Delete all employees whose empid is less than the given id.

/update-salary/:id/:amount → Update the salary of an employee with the given empid.

/update-salary-range/:id/:amount → Increase salary of all employees with empid greater than or equal to given id.

/search-employee/:name → Find employees by name.

(B) Department Routes

/seed-departments → Insert at least 3 sample departments into the departments collection.

/view-departments → Display all departments.

/add-department/:id/:name → Add a new department.

/delete-department/:id → Delete a department.

/update-department/:id/:newname → Update department name.


*/





const express = require("express");
const app = express();

const {MongoClient} = require("mongodb")
let db;
async function connectDb(){
    try {
        const client = new MongoClient("mongodb://localhost:27017")
        await client.connect()
        db = client.db("CompanyDB")
        console.log("database connected..")
    } catch (error) {
        console.log(error)    
    }
}

connectDb();




// employee
app.get('/seed-employees',async (req,res)=>{
    let dbresponse = await db.collection("employee").insertMany(
  [
  { empid: 101, name: "Rahul Singh", salary: 45000, deptid: 1 },
  { empid: 102, name: "Anita Sharma", salary: 52000, deptid: 2 },
  { empid: 103, name: "Vikram Yadav", salary: 60000, deptid: 1 },
  { empid: 104, name: "Priya Verma", salary: 48000, deptid: 3 },
  { empid: 105, name: "Amit Patel", salary: 55000, deptid: 2 },
  { empid: 106, name: "Neha Gupta", salary: 62000, deptid: 3 },
  { empid: 107, name: "Anura Gupta", salary: 66000, deptid: 3 }
]
    )
    res.send(dbresponse);
})



app.get("/view-employees", async (req, res)=>{
    let data = await db.collection("employee").find().toArray()
    res.send(data)
})



app.get("/add-employees/:id/:name/:salary/:deptid" ,async(req,res)=>{
    const {id,name,salary,deptid}= req.params;
     const newEmploye ={
        empid : Number(id),
        name :name,
        salary : Number(salary),
        deptid : Number(deptid)
     }
     await db.collection("employee").insertOne(newEmploye);
     res.redirect('/view-employees');
})


app.get('/delete-employees/:id',async (req,res)=>{
    const userid =Number(req.params.id);
    await db.collection("employee").deleteOne({empid: userid});
    res.redirect("/view-employees");
})


app.get("/update-salary/:id/:amount",async(req,res)=>{

   const {id, amount} = req.params;

   const empid = Number(id);

   const newsalary = Number(amount);

   await db.collection("employee").updateOne(
        {empid :empid},
        {$set:{salary:newsalary}}
   );

   res.redirect('/view-employees');
})

app.get('/update-salary-range/:id/:amount',async(req,res)=>{

 const { id,amount}= req.params;

 const rangeSalary = {
     empid:Number(id),
     salary :Number(amount)

 }
 await db.collection("employee").updateMany(
    {empid:{$gte : rangeSalary.empid}}, // $gte mean greater than equal to
    {$inc:{salary: rangeSalary.salary} } //$inc  means increment 
 )
 res.redirect('/view');

})




app.get('/search-employee/:name', async (req, res) => {
    const { name } = req.params;

    const result = await db.collection("employee").findOne({ name });
     res.send(result);
    
  
});


// Department Routes


app.get('/seed-department',async(req,res)=>{
   const dbresponse= await db.collection("departments").insertMany(
    [
  { deptid: 1, deptname: "Human Resources" },
  { deptid: 2, deptname: "Finance" },
  { deptid: 3, deptname: "Engineering" }
    ])
    res.send(dbresponse);
})


app.get('/view-department',async(req,res)=>{
    let result = await db.collection("departments").find().toArray();
   res.send(result);
})


app.get("/add-department/:id/:name",async(req,res)=>{
    const { id, name} = req.params;

    const newDepartment = (
        {
            deptid :Number(id),
            deptname: name
        }
    )
    await db.collection('departments').insertOne(newDepartment);
    res.redirect('/view-department');

})

app.get('/delete-department/:id',async(req,res)=>{

    const departmentId = Number(req.params.id);
    await db.collection('departments').deleteOne({deptid: departmentId});
    res.redirect('/view-department');
})

app.get('/update-department/:id/:newname', async (req, res) => {
    const { id, newname } = req.params;

    await db.collection('departments').updateOne(
        { deptid: Number(id) },      
        { $set: { deptname: newname } }  
    );

    res.redirect('/view-department');
});





app.listen(3000,()=>{
  console.log('Server Started..!')
})
