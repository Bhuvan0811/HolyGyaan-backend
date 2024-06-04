require('dotenv').config();
const mongoose = require("mongoose");
mongoose.connect(process.env.CONSTR);

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