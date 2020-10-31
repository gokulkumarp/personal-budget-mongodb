const mongoose = require("mongoose");

var optionalWithLength = function (minLength, maxLength) {
  minLength = minLength || 0;
  maxLength = maxLength || Infinity;
  return {
    validator: function (value) {
      if (value === undefined) return true;
      return value.length >= minLength && value.length <= maxLength;
    },
    message:
      "Length should be at least 6 digits"
  };
};

const budgetSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      validate: optionalWithLength(6, 7),
      required: true,
    },
  },
  { collection: "expense" }
);

module.exports = mongoose.model("expense", budgetSchema);