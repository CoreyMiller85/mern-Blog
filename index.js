const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const bcrypt = require("bcrypt");
const config = require("./config/key");

const app = express();

mongoose
	.connect(config.mongoURI, { useNewUrlParser: true })
	.then(() => console.log("DB Connected"))
	.catch((err) => {
		console.log(err);
	});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/api/users/register", (req, res) => {
	const user = new User(req.body);
	user.save((error, userData) => {
		if (error) {
			return res.json({ success: false, error: error });
		}
		return res.status(200).json({ success: true, userData });
	});
});

app.post("/api/user/login", (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) {
			res.json({ success: false, error: "Invalid Username or Password" });
		}

		// Compare Password with hash

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) {
				return res.json({
					success: false,
					error: "Invalid Username or Password",
				});
			}
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				res.cookie("x_auth", user.token).status(200).json({ success: true });
			});
		});
	});
});

const port = process.env.port || 4000;

app.listen(port, () => console.log(`Server Listening on PORT ${port}`));
