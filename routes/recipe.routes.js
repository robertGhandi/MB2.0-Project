const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/owner");
const express = require("express");
const router = express.Router();

const {
	createRecipe,
	getAllRecipe,
	getSingleRecipe,
	updateRecipe,
	deleteRecipe,
} = require("../controllers/recipe.controller");

router.post("/", auth, createRecipe);
router.get("/", auth, getAllRecipe);
router.get("/:recipeId", auth, getSingleRecipe);
router.delete("/:recipeId", [auth, authorize], deleteRecipe);

router.put("/:recipeId", [auth, authorize], updateRecipe);

module.exports = router;
