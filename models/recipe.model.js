const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	quantity: {
		type: String,
		required: true,
	},
});

const instructionSchema = new mongoose.Schema({
	stepNumber: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const RecipeSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		ingredients: [ingredientSchema],
		instructions: [instructionSchema],
		prepTimeInMinutes: {
			type: Number, // in minutes
			required: true,
		},
		cookTimeInMinutes: {
			type: Number, // in minutes
			required: true,
		},
		numberOfServings: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Drink"],
			required: true,
		},
		cuisine: {
			type: String,
			required: true,
		},
		difficulty: {
			type: String,
			enum: ["Easy", "Medium", "Hard"],
			required: true,
		},
		image: {
			type: String,
			default: "",
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const RecipeModel = mongoose.model("Recipe", RecipeSchema);
module.exports = RecipeModel;
