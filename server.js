const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const {Poll} = require("./database.js");
const port = process.env.PORT || 5000;
require("dotenv").config();

const app = express();
const http = require("http");
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname,"frontend\\build")));

// build
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname,"frontend\\build","index.html"));
// });

app.get("/api/polls", (req, res) => {
  Poll.find({},(err, foundPosts)=>{
    res.json(foundPosts);
  });
});

app.post("/api/create", (req, res) => {
  const options = [];
  req.body.options.map((element) => {
    options.push({name: element, count: 0});
  });
  const data = new Poll({
    question: req.body.question,
    options: options
  });
  data.save();
});

app.get("/api/poll/:id", (req, res) => {
  let id = req.params.id;
  Poll.findById(id, (err, result) => {
    if(err) {
      throw err;
    }
    res.json(result);
  });
});

app.post("/api/vote/:id", (req, res) => {
  const id = req.params.id; // body better?
  const poll = req.body.poll;
  const index = req.body.index;
  const newOptions = poll.options;
  newOptions[index].count++;
  Poll.findOneAndUpdate({_id: id}, {options: newOptions}, (err, doc) => {
    if(err) {
      console.log(err);
    }
  });
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

// build
// server.listen(port, () => {
//   console.log("Server running on port " + port);
// });

