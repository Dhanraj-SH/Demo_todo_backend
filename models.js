const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: mongoose.Types.ObjectId
});

const userModel = mongoose.Model("users", userSchema);
const todoModel = mongoose.Model("todo", todoSchema);

module.exports = {
    userModel: userModel,
    todoModel: todoModel
}