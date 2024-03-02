const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    followers: [{ type: ObjectId, ref: "USER", name: String, userName: String, Photo: String }],
    following: [{ type: ObjectId, ref: "USER", name: String, userName: String, Photo: String }],
    groups: [{ type: ObjectId, ref: "GROUP", groupName: String, Photo: String }],
    userFeed: [{ type: String }]
}, { timestamps: true });

mongoose.model("USER", userSchema)