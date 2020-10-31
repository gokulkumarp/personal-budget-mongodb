const express = require("express");
const router = express.Router();
const budgetModel = require("./models/budget-schema");

router.post("/create", (req, res) => {
  const expense = new budgetModel({
    title: req.body.title,
    budget: req.body.budget,
    color: req.body.color,
  });
  expense.save().then((data) => {
    if (!data) {
      return res.status(400).json({
        errors: err,
      });
    }
    return res.json(data);
  });
});

router.get("/all", (req, res) => {
  budgetModel.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        errors: err,
      });
    }
    return res.json(data);
  });
});

module.exports = router;