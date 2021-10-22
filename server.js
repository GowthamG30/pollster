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
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname,'frontend\\build')));

mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true}); // check these later

const postSchema = new mongoose.Schema({
  question: String,
  options: [String]
});

const Post = mongoose.model("Post", postSchema);

// build
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,'frontend\\build','index.html'));
// });

app.get('/api/polls', (req, res) => {
  Post.find({},(err, foundPosts)=>{
    res.json(foundPosts);
  });
  // try {
  //   res.send();
  // } catch(err) {
  //   console.log(err);
  // }
});

// app.post('/api/create', (req, res) => {
//
// });

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

// build
// server.listen(port, () => {
//   console.log('Server listening on port ' + port);
// });

