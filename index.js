const authRoutes = require("./routes/auth.routes");
const recipeRoutes = require("./routes/recipe.routes")
const mongoose = require("mongoose");
const morgan = require("morgan");

const express = require("express");
const app = express();

const PORT = 4000;

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/recipe", recipeRoutes)

const startServer = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/recipe-app");
		console.log("Connected to database!");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error.message);
	}
};
startServer();
