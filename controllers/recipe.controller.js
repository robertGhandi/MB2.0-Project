const RecipeModel = require("../models/recipe.model");
const mongoose = require("mongoose");

const getAllRecipe = async (req, res) => {
	try {
		const recipes = await RecipeModel.find();
		res.status(200).json({
			status: "success",
			message: "Fetched Recipes successfully",
			data: recipes,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "server error",
		});
	}
};

const createRecipe = async (req, res) => {
	try {
		// check to ensure the recipe title is unique
		const { title } = req.body;

		const foundRecipe = await RecipeModel.findOne({ title });

		if (foundRecipe) {
			// Duplicate recipe title
			return res.status(409).json({
				status: "error",
				message: `Recipe with title '${title}' already exists.`,
			});
		}

		// create a recipe object
		const newRecipe = new RecipeModel({
			title,
			description: req.body.description,
			ingredients: req.body.ingredients,
			instructions: req.body.instructions,
			prepTimeInMinutes: req.body.prepTimeInMinutes,
			cookTimeInMinutes: req.body.cookTimeInMinutes,
			numberOfServings: req.body.numberOfServings,
			category: req.body.category,
			cuisine: req.body.cuisine,
			difficulty: req.body.difficulty,
			image: req.body.image,
			createdBy: req.user._id,
		});

		// save to the db
		// await newRecipe.save();
		const recipe = await RecipeModel.create(newRecipe);

		// Return a 201 (created) response
		return res.status(201).json({
			status: "success",
			message: "Recipe created",
			data: recipe,
		});
	} catch (error) {
		console.log(error.message);
		return res
			.status(500)
			.json({ success: "error", message: "Something went wrong" });
	}
};

const getSingleRecipe = async (req, res) => {
	try {
		const { recipeId } = req.params;

		if (!mongoose.isValidObjectId(recipeId)) {
			return res.status(400).json({
				status: "error",
				message: "Invalid Recipe ID",
			});
		}

		const recipe = await RecipeModel.findById(recipeId);

		if (!recipe) {
			return res.status(404).json({
				status: "error",
				message: `recipe with id = ${recipeId} not found`,
			});
		}

		res.status(200).json({
			status: "success",
			message: "Fetched Recipe Successfully",
			data: recipe,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "server error",
		});
	}
};

const updateRecipe = async (req, res) => {
	try {
		const { recipeId } = req.params;
		//const { name, ingredients, instructions } = req.body

		if (!mongoose.isValidObjectId(recipeId)) {
			return res.status(400).json({
				status: "error",
				message: "Invalid Recipe ID",
			});
		}

		const updateRecipe = await RecipeModel.findByIdAndUpdate(
			recipeId,
			req.body,
			{
				new: true,
			}
		);

		if (!updateRecipe) {
			return res.status(404).json({
				status: "error",
				message: `Recipe with id = ${recipeId} not found.`,
			});
		}

		res.status(200).json({
			status: "success",
			message: `Recipe with id = ${recipeId} updated successfully`,
			data: updateRecipe,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "server error",
		});
	}
};

const deleteRecipe = async (req, res) => {
	try {
		const { recipeId } = req.params;

		if (!mongoose.isValidObjectId(recipeId)) {
			return res.status(400).json({
				status: "error",
				message: "Invalid Recipe ID",
			});
		}

		const recipe = await RecipeModel.findByIdAndDelete(recipeId);

		if (!recipe) {
			return res.status(404).json({
				status: "success",
				message: `Recipe with id = ${recipeId} not found`,
			});
		}

		res.status(200).json({
			status: "success",
			message: `Recipe with id = ${recipeId} deleted successfully.`,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			status: "error",
			message: "server error",
		});
	}
};

const searchRecipe = async(req, res) => {
	const { category, title, difficulty } = req.query;

		let filters = {};

        if (category) filters.category = category;
}

module.exports = {
	getAllRecipe,
	createRecipe,
	getSingleRecipe,
	updateRecipe,
	deleteRecipe,
	searchRecipe
};
