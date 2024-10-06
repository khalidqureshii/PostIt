import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },

    username: {
        type:String,
        require:true
    },

    date: {
        type: Date,
        default: Date.now()
    },  

    title: {
        type: String,
        require: true
    },

    body: {
        type: String,
        require: true
    }
});

const BlogEntry = mongoose.model("blogs", blogSchema);
export default BlogEntry;