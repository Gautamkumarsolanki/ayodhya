const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    Photo: {
        type: String,
    },
    bio: {
        type: String
    },
    followers: [{ type: ObjectId, ref: "USER" }],
    following: [{ type: ObjectId, ref: "USER" }],
    groups: [{ type: ObjectId, ref: "GROUP" }],
    userFeed: [{ type: String }]
}, { timestamps: true });

mongoose.model("USER", userSchema)