const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    student: {
      name: "John Doe",
      email: "john@example.com",
      role: "admin"
    },
    courses: [
      { title: "Web Development", grade: "A" },
      { title: "Database Systems", grade: "B" },
      { title: "Operating Systems", grade: "D" }
    ],
    notice: "<b>Important Notice</b>"
  });
});

app.listen(3000, () => {
  console.log("Server Satrted..!");
});
