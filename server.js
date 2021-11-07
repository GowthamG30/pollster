const express = require("express");
const path = require("path");
const cors = require("cors");
const { Poll, User } = require("./database.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
//   res.sendFile(path.join(__dirname,"frontend\\build","index.html"));
// });

const generateAccessToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: process.env.TOKEN_LIFE});
  return token;
};

// const verifyToken = (token) => {
//   try {
//     const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     return decodedData;
//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       err.message = "User Session Expired";
//       err.status = 401;
//       throw err;
//     }
//     throw err;
//   }
// };

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if(err) {
      // console.log(err);
      return res.sendStatus(403);
    }
    req.currentUserName = user.name;
    next();
  })
};

app.get("/api/verify", authenticateToken, (req, res) => {
	res.send(req.currentUserName);
});

app.post("/api/register", (req, res) => { //////////////////////////////////////////////////////////////////
  // check if username already present
  // User.findOne({
  //   where: {
  //     username: req.body.username
  //   }
  // }).then(user => {
  //   if (user) {
  //     res.status(400).json({
  //       message: "Username already exists"
  //     });
  //   } else {
  //     // hash password
        
  //   bcrypt.hash(req.body.password, saltRounds, (err, hashPassword) => {
  //     const user = new User({
  //       username: req.body.username,
  //       password: hashPassword
  //     });

  //     user.save(function (err) {
  //       if(err) {
  //         console.log(err);
  //       }
  //       else {
  //         // console.log("success");
  //         res.end();
  //       }
  //     });

  //   });
  //   }



    bcrypt.hash(req.body.password, saltRounds, (err, hashPassword) => {
      const user = new User({
        username: req.body.username,
        password: hashPassword
      });

      user.save(function (err) {
        if(err) {
          console.log(err);
        }
        else {
          // console.log("success");
          res.end();
        }
      });
  });

});

app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username: username}, (err, foundUser) => {
    if(err) {
      console.log(err);
    }
    else {
      if(foundUser) {
        bcrypt.compare(password, foundUser.password, (error, result) => {
          if(result) {	// Password matched
            const accessToken = generateAccessToken({name: username});
            res.send({username: username, accessToken: accessToken});
          }
          else {
            res.sendStatus(401);
          }
        });
      }
      else {
        res.sendStatus(401);
      }
    }
  });
});

app.get("/api/polls", authenticateToken, (req, res) => {
  const currentUserName = req.currentUserName;
  const data = [];
  User.find({}, (err, foundUsers) => {
    if(err) {
      console.log(err);
    }
    else {
      foundUsers.forEach(user => {
        data.push({
          username: user.username,
          polls: user.polls
        });
      });
      res.json({
        currentUserName: currentUserName,
        users: data
      });
    }
  });
});


app.post("/api/create", authenticateToken, (req, res) => {
  const currentUserName = req.currentUserName;
  const options = [];
  req.body.options.map((element) => {
    options.push({name: element, count: 0});
  });
  const data = new Poll({
    question: req.body.question,
    options: options
  });

  User.findOneAndUpdate({username: currentUserName}, {$push: {polls: data}}, (err, foundUser) => {
    if(err) {
      console.log(err);
    }
    else {
      data.save((err) => {
        if(err) {
          console.log(err);
        }
        else {
          // console.log("success");
          res.end();
        }
      });
    }
  });
});

app.get("/api/poll/:id", authenticateToken, (req, res) => {
  const currentUserName = req.currentUserName;
  const id = req.params.id;
  Poll.findById(id, (err, result) => {
    if(err) {
      throw err;
    }
    res.send({
      currentUserName: currentUserName,
      poll: result
    });
  });
});

app.post("/api/vote/:id", authenticateToken, (req, res) => {
  const currentUserName = req.currentUserName;
  const id = req.params.id; // body better?
  const poll = req.body.poll;
  const index = req.body.index;
  const newOptions = poll.options;
  newOptions[index].count++;
  Poll.findOneAndUpdate({_id: id}, {options: newOptions, $push: {voters: currentUserName}}, (err, doc) => {
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
