const Recipe = require("../models/recipe.model");

const authorize = async (req, res, next) => {
	const { recipeId } = req.params;

	const userId = req.user._id;

	const recipe = await Recipe.findById(recipeId);
	if (!recipe) {
		return res.status(404).json({
			status: "error",
			message: "Recipe not found.",
		});
	}

	if (recipe.createdBy.toString() !== userId.toString()) {
		return res.status(403).json({
			status: "error",
			message: "Access denied.",
		});
	}

	next();
};

module.exports = authorize;
