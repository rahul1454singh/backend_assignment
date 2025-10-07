const express= require("express");
const app = express();
const path = require("path");

app.set('view engine','ejs');
app.set("views", path.join(__dirname, "view")); 



app.get("/welcome", (req, res) => {
  res.render("greeting", { userName: "John Doe", isLoggedIn: true });
});



app.get("/login", (req, res) => {
  res.render("greeting", { userName: "Guest", isLoggedIn: false });
});

app.listen(3000,()=>{
    console.log("Server Started..!");
})