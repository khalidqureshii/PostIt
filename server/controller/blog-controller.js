import express from "express";
import BlogEntry from "../models/blog-model.js";

const newBlog = async (req, res) => {
    try {
        const {userID, username, title, body, tags} = req.body;
        console.log(req.body);
        // console.log(username);
        // console.log(title);
        // console.log(body);
        // console.log(tags);
        const newPost = await BlogEntry.create({userID, username, title, body, tags});
        res.status(200).json({msg: "Blog Created", post: newPost});
    }
    catch (err) {
        const status = 401;
        const message = "User Token Does Not Exist";
        const extraDetails = "";
        const errorDetails = {
            message,
            status,
            extraDetails
        }
        console.log("Error");
    }
}

const getBlogs = async (req, res) => {
    try {
        const reversedOutput = await BlogEntry.find();
        const output = reversedOutput.reverse();
        res.status(200).json({msg: "All Blogs Returned", allEntries: output});
    }
    catch (err) {
        const status = 401;
        const message = "User Token Does Not Exist";
        const extraDetails = err.errors[0].message.toString();
        const errorDetails = {
            message,
            status,
            extraDetails
        }
        next(errorDetails);
    }
}

const getBlogsByTag = async (req, res) => {
    const {tag} = req.body;
    try {
        const reversedOutput = await BlogEntry.find({ tags: { $in: tag } });
        const output = reversedOutput.reverse();
        res.status(200).json({msg: `All Blogs by Tag ${tag} Returned`, allEntries: output});
    }
    catch (err) {
        const status = 401;
        const message = "User Token Does Not Exist";
        const extraDetails = err.errors[0].message.toString();
        const errorDetails = {
            message,
            status,
            extraDetails
        }
        next(errorDetails);
    }
}

const getUserBlogs = async (req, res) => {
    try {
        const {userID} = req.body;
        const reversedOutput = await BlogEntry.find({userID});
        const output = reversedOutput.reverse();
        res.status(200).json({msg: "All Blogs by User Returned", allEntries: output});
    }
    catch (err) {
        const status = 401;
        const message = "User Token Does Not Exist";
        const extraDetails = err.errors[0].message.toString();
        const errorDetails = {
            message,
            status,
            extraDetails
        }
        next(errorDetails);
    }
}


const deleteBlog = async (req, res) => {
    try {
        const {blogID} = req.body;
        const output = await BlogEntry.deleteOne({_id: blogID});
        res.status(200).json({msg: "Successfully Deleted Blog"});
    }
    catch (err) {
        const status = 401;
        const message = "User Token Does Not Exist";
        const extraDetails = err.errors[0].message.toString();
        const errorDetails = {
            message,
            status,
            extraDetails
        }
        next(errorDetails);
    }
}

export {newBlog, getBlogs, deleteBlog, getUserBlogs, getBlogsByTag};
