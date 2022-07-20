const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const AllData = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("AllData", AllData);