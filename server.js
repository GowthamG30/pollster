const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { Poll, User } = require("./database.js");
const bcrypt = require("bcryptjs");
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

app.post("/api/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10); // check await async and all
  const hashPwd = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashPwd
  });

  user.save();
});

app.post("/api/login", async (req, res) => {
  const user = User.findOne({username: req.body.username});

  if(!user) {
    // user not found
    return res.status(404).send({
      message: "user not found"
    });
  }

  if(!await bcrypt.compare(req.body.password, user.password)) {
    return res.status(400).send({
      message: "invalid credentials"
    });
  }

  // const token = jwt.sign({_id: user._id}, "secret")
  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   maxAge: 24 * 60 * 60 * 1000 // 1 day
  // });

  res.send({
    message: "success"
  });
});

app.get("/api/polls", (req, res) => {
  Poll.find({},(err, foundPosts) => {
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

