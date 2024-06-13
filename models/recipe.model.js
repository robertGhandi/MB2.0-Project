const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	ingredients: {
		type: [String],
		required: true,
	},
	instructions: {
		type: String,
		required: true,
	},
}, { timestamps: true });

const RecipeModel = mongoose.model("Recipe", RecipeSchema);
module.exports = RecipeModel;
