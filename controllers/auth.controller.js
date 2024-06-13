const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
	try {
		const { fullname, email, password } = req.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.send({ message: "user already exists!!" });
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
				status: "success",
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

		res.status(200).json({
			status: "success",
			message: "login successful",
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
