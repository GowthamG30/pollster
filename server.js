const cors = require("cors");
const express = require("express");
// const flash = require('connect-flash');
const { Poll, User } = require("./database.js");
const passport = require("passport");
const port = process.env.PORT || 5000;
const session = require("express-session");
require("dotenv").config();

const app = express();
app.use(cors());
// app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.set("trust proxy", 1);
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
	cookie: {
		// secure: true,
		maxAge: 1000 * 60 * 60 * 1 // 1 hour
	}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*
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

	// Veify the token of the user
	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
		if(err) {
			console.error(err);
			return res.status(403).send("Session expired");
		}
		req.currentUserName = user.name;
		next();
	})
};
*/

// Verify authentication in routes
app.get("/api/verify", (req, res) => {
	if(req.isAuthenticated()) {
		res.send(req.user.username);
	}
	else {
		// Improve this later
		res.status(403).send("Session expired");
	}
});

// Register a new user
app.post("/api/register", (req, res) => {
	// Convenience method to register a new user instance with a given password. Checks if username is unique
	User.register({username: req.body.username}, req.body.password, (err, user) => {
		if(err) {
			console.log(err.message);
			res.status(400).send("Username already exists");
		}
		else {
			passport.authenticate("local")(req, res, () => {
				res.end();
			});
		}
	});
});

// Login
app.post("/api/login", passport.authenticate("local", { failureRedirect: "/" }), (req, res) => {
	res.end();
	// https://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling
	// if failure -> res.status(401).send("Invalid username or password");
	// https://github.com/jaredhanson/connect-flash
	// passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
	// passport.authenticate("local", { failureRedirect: "/" })
	// Need to tell this in frontend
});

// Logout
app.get("/api/logout", (req, res) => {
	req.logout();
	res.end();
});

// Create a poll
app.post("/api/create", (req, res) => {
	if(req.isAuthenticated()) {
		const currentUserName = req.user.username;
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
		
		// Save poll data to database
		newPoll.save((err) => {
			if(err) {
				console.error(err);
				res.status(500).send("Internal server error");
			}
			else {
				res.end();
			}
		});
	}
	else {
		res.status(403).send("Session expired");
	}
});

// Get all polls
app.get("/api/polls", (req, res) => {
	if(req.isAuthenticated()) {
		const currentUserName = req.user.username;
		// Find all polls
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
	}
	else {
		res.status(403).send("Session expired");
	}
});

app.route("/api/poll/:id")
	// Get a poll
	.get((req, res) => {
		if(req.isAuthenticated()) {
			const currentUserName = req.user.username;
			const id = req.params.id;
			// Find the poll by its id
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
		}
		else {
			res.status(403).send("Session expired");
		}
	})
	// Delete a poll
	.delete((req, res) => {
		if(req.isAuthenticated()) {
			const id = req.params.id;
			// Delete a poll by its id
			Poll.deleteOne({_id: id}, (err, deletedPoll) => {
				if(err) {
					console.error(err);
					res.status(500).send("Internal server error");
				}
				else {
					res.end();
				}
			});
		}
		else {
			res.status(403).send("Session expired");
		}
	});

// Vote a poll
app.post("/api/vote/:id", (req, res) => {
	if(req.isAuthenticated()) {
		const currentUserName = req.user.username;
		const id = req.params.id;
		const poll = req.body.poll;
		const index = req.body.index;
		const newOptions = poll.options;
		newOptions[index].count++;
		// Update the poll data
		Poll.findByIdAndUpdate(id, {options: newOptions, $push: {voters: currentUserName}}, (err, doc) => {
			if(err) {
				console.error(err);
				res.status(500).send("Internal server error");
			}
			else {
				res.end();
			}
		});
	}
	else {
		res.status(403).send("Session expired");
	}
});

app.get("/api/test", (req, res) => {
	if(req.isAuthenticated()) {
		res.send("oyy");
	}
	else {
		res.send("noo");
	}
});

// Listen to a specific port
app.listen(port, () => {
	console.log("Server running on port " + port);
});
