const express = require("express");
const app = express();
const port = 3000;

app.use("/", express.static("public"));

const budget = {
  myBudget: [
    {
      title: "Eat out",
      budget: 30,
    },
    {
      title: "Rent",
      budget: 375,
    },
    {
      title: "Groceries",
      budget: 100,
    },
  ],
};

app.get("/hello", function (req, res) {
  res.send("hello world");
});

app.get("/budget", function (req, res) {
  res.json(budget);
});

app.listen(port, () => {
  console.log("Example app listening at http://localhost:" + port);
});
