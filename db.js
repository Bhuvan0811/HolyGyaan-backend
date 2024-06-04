const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://bhuvankaushal08112002:M8q85CYUkMJejSOJ@cluster0.0km1b1v.mongodb.net/");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName:{
        type: String,
        required: true,
        maxLength: 30,
        trim: true,
        lowercase:true, 
    },
    lastName:{
        type: String,
        maxLength: 50,
        trim: true,
        lowercase: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
}