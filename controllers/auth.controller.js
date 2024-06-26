const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
	try {
		const { fullname, email, password } = req.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(409).send({ message: "user already exists!!" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			fullname,
			email,
			password: hashedPassword,
		});
		res.status(201).send({
			status: "success",
			message: "user registration successful",
			data: newUser,
		});
	} catch (error) {
		console.log(err.message);
		return res.status(500).json({
			status: "error",
			message: "Error creating user",
		});
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const userExists = await User.findOne({ email });

		if (!userExists) {
			return res.status(404).send({
				status: "error",
				message: "user not found",
			});
		}

		const passwordMatch = bcrypt.compare(password, userExists.password);

		if (!passwordMatch) {
			return res.status(401).json({
				status: "success",
				message: "Invalid email or password",
			});
		}

		// Generate jwt token
		const payload = {
			userId: userExists._id,
			username: userExists.fullname,
		};
		const token = jwt.sign(
			payload,
			"1234!@#$%<{*&)",
			{ expiresIn: "1h" }
		);

		res.status(200).json({
			status: "success",
			message: "login successful",
			data: {
				token,
				username: userExists.fullname,
				email: userExists.email,
			},
		});
	} catch (error) {
		console.log(err.message);
		return res.status(500).json({
			status: "error",
			message: "Error during login",
		});
	}
};

module.exports = { registerUser, loginUser };
