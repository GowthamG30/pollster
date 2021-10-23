const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();
const http = require('http');
const server = http.createServer(app);

app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname,'frontend\\build')));

mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true}); // check these later

const pollSchema = new mongoose.Schema({
  question: String,
  options: [{
    name: String,
    count: Number
  }]
});

const Poll = mongoose.model("Poll", pollSchema);

// build
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,'frontend\\build','index.html'));
// });

app.get('/api/polls', (req, res) => {
  Poll.find({},(err, foundPosts)=>{
    res.json(foundPosts);
  });
});

app.post('/api/create', (req, res) => {
  const options = [];
  req.body.options.map((element) => {
    options.push({name: element, count: 0});
  });
  const data = new Poll({
    question: req.body.question,
    options: options
  });
  // console.log(data);
  data.save();
});

app.get('/api/poll/:id', (req, res) => {
  let id = req.params.id;
  Poll.findById(id, (err, result) => {
    if(err) {
      throw err;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});

// build
// server.listen(port, () => {
//   console.log('Server running on port ' + port);
// });

