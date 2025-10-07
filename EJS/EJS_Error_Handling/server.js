
const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,  "views"));

app.get("/home", (req, res) => {
  res.send("Home Page");
});


app.get("/", (req, res) => {
  res.render("error-layout", {
    errorData: {
      errorType: "VALIDATION",
      statusCode: 400,
      message: "Invalid email",
      timestamp: new Date(),
      requestUrl: req.originalUrl
    }
  });
});




// app.get("/", (req, res) => {
//   res.render("error-layout", {
//     errorData: {
//       errorType: "NOT_FOUND",
//       statusCode: 404,
//       message: "The page  does not exist",
//       timestamp: new Date(),
//       requestUrl: req.originalUrl
//     }
//   });
// });



// app.get("/", (req, res) => {
//   res.render("error-layout", {
//     errorData: {
//       errorType: "SERVER_ERROR",
//       statusCode: 500,
//       message: "Something went wrong",
//       timestamp: new Date(),
//       requestUrl: req.originalUrl
//     }
//   });
// });





app.listen(3000,()=>{
    console.log("Server Started..!")
})

