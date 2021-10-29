const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true}); // check these later

const pollSchema = new mongoose.Schema({
  question: String,
  options: [{
    name: String,
    count: Number
  }]
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = {
  Poll: Poll
};