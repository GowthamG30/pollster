const bcrypt = require("bcryptjs");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const { Poll, User } = require("./database.js");
const port = process.env.PORT || 5000;
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
require("dotenv").config();

const app = express();
const http = require("http");
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname,"frontend\\build")));

// build
// app.get("/", (req, res) => {
//   res.render("index.html");
// });

const generateAccessToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: process.env.TOKEN_LIFE});
  return token;
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if(token == null) {
    return res.status(401).send("Unauthorized access");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if(err) {
      console.error(err);
      return res.status(403).send("Session expired");
    }
    req.currentUserName = user.name;
    next();
  })
};

// Verify authentication in routes
app.get("/api/verify", authenticateToken, (req, res) => {
	res.send(req.currentUserName);
});

app.post("/api/register", (req, res) => {
  // Check if username already exists
  User.findOne({username: req.body.username}, (err, user) => {
    if(err) {
			console.error(err);
			res.status(500).send("Internal server error");
		}
    else if(user) {
      res.status(400).send("Username already exists");
    }
    else {
      // Hash password
      bcrypt.hash(req.body.password, saltRounds, (err_hash, hashPassword) => {
        if(err_hash) {
          console.error(err_hash);
          res.status(500).send("Internal server error");
        }
        else {
          const user = new User({
            username: req.body.username,
            password: hashPassword
          });
  
          user.save((err_save) => {
            if(err_save) {
              console.error(err_save);
              res.status(500).send("Internal server error");
            }
            else {
							res.end();
						}
          });
        }
      });
    }
  });
});

// Login
app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username: username}, (err, foundUser) => {
    if(err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
    else {
      if(foundUser) {
        bcrypt.compare(password, foundUser.password, (err_cmp, result) => {
					if(err_cmp) {
            console.error(err_cmp);
            res.status(500).send("Internal server error");
          }
          else if(result) {	// Password matched
            const accessToken = generateAccessToken({name: username});
            res.send({username: username, accessToken: accessToken});
          }
          else {
            res.status(401).send("Please provide a valid username and password.");
          }
        });
      }
      else {
        res.status(401).send("Please provide a valid username and password.");
      }
    }
  });
});

// Create a poll
app.post("/api/create", authenticateToken, (req, res) => {
  const currentUserName = req.currentUserName;
  const options = [];
  req.body.options.map((element) => {
    options.push({name: element, count: 0});
  });

  const newPoll = new Poll({
    question: req.body.question,
    options: options,
    author: currentUserName,
    voters: [],
  });
  
  newPoll.save((err) => {
    if(err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
    else {
      res.end();
    }
  });
});

// Get all polls
app.get("/api/polls", authenticateToken, (req, res) => {
  const currentUserName = req.currentUserName;
  Poll.find({}, (err, foundPolls) => {
    if(err) {
      console.error(err);
			res.status(500).send("Internal server error");
    }
    else {
      res.json({
        currentUserName: currentUserName,
        polls: foundPolls
      });
    }
  });
});

app.route("/api/poll/:id")
  // Get a poll
  .get(authenticateToken, (req, res) => {
    const currentUserName = req.currentUserName;
    const id = req.params.id;
    Poll.findById(id, (err, foundPoll) => {
      if(err) {
        console.error(err);
        res.status(500).send("Internal server error");
      }
      else {
        res.json({
          currentUserName: currentUserName,
          poll: foundPoll
        });
      }
    });
  })
  // Delete a poll
  .delete(authenticateToken, (req, res) => {
    const id = req.params.id;
    Poll.deleteOne({_id: id}, (err, deletedPoll) => {
      if(err) {
        console.error(err);
        res.status(500).send("Internal server error");
      }
			else {
				res.end();
			}
    });
  });

// Vote a poll
app.post("/api/vote/:id", authenticateToken, (req, res) => {
  const currentUserName = req.currentUserName;
  const id = req.params.id;
  const poll = req.body.poll;
  const index = req.body.index;
  const newOptions = poll.options;
  newOptions[index].count++;
  Poll.findByIdAndUpdate(id, {options: newOptions, $push: {voters: currentUserName}}, (err, doc) => {
    if(err) {
			console.error(err);
			res.status(500).send("Internal server error");
		}
		else {
			res.end();
		}
  });
});

// Listen to a specific port
app.listen(port, () => {
  console.log("Server running on port " + port);
});

// build
// server.listen(port, () => {
//   console.log("Server running on port " + port);
// });
