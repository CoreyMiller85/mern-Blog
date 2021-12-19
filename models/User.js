const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const saltRounds = 10;

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		maxlength: 50,
	},
	email: {
		type: String,
		trim: true,
		unique: 1,
	},
	password: {
		type: String,
		minlength: 5,
	},
	lastName: {
		type: String,
		maxlength: 50,
	},
	role: {
		type: Number,
		default: 0,
	},
	token: {
		type: String,
	},
	tokenExp: {
		type: Number,
	},
});

userSchema.pre("save", function (next) {
	const user = this;
	if (user.isModified("password")) {
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) next(err);
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
	bcrypt.compare(plainPassword, this.password, function (err, result) {
		if (err) {
			return cb(err);
		} else {
			cb(null, result);
		}
	});
};

userSchema.methods.generateToken = function (cb) {
	const user = this;
	const token = jwt.sign(user._id.toHexString(), "secret");
	user.token = token;
	user.save(function (err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
