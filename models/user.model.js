const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	fullname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true
	},
	recipes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Recipe"
        }
    ],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
