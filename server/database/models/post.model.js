const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        post : { 
            type: String, 
            required: true, 
            maxlength: [50, "the description is too long"] 
        },
        user : { type: String , required: true },
        date: { type: String },
        // point : {type : mongoose.Schema.Types.ObjectId, ref: 'Point'}
    },
);

const Post = mongoose.model("post", postSchema);

module.exports = {Post, postSchema};