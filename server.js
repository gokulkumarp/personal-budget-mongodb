const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");
const budgetModel = require("./models/budget-schema");


let url = 'mongodb://localhost:27017/budget_expense'

app.use("/", express.static("public"));

const mongoose = require("mongoose");
require("dotenv").config();
const expense = require("./budgetRoute");

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
    budgetModel.find({})
    .then((data)=>{
    })
  })
  .catch((err) => {
    console.log(err);
  });



  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use("/", express.static("public"));
  
  // Route Middleware
  app.use("/budget", expense);
  

app.listen(port, () => {
  console.log("Example app listening at http://localhost:" + port);
});
