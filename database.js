const mongoose = require("mongoose");
require('dotenv').config();

// Connect to mongoDB atlas
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}); // check these later

const pollSchema = new mongoose.Schema({
	question: String,
	options: [{
		name: String,
		count: Number
	}],
	author: String,
	voters: [String]
});

const userSchema = new mongoose.Schema({
	username: String,
	password: String
});

const Poll = mongoose.model("Poll", pollSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
	Poll: Poll,
	User: User
};
