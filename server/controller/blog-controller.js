import express from "express";
import BlogEntry from "../models/blog-model.js";

const newBlog = async (req, res, next) => {
    try {
        const {userID, username, title, body, tags} = req.body;
        console.log(req.body);
        const newPost = await BlogEntry.create({userID, username, title, body, tags});
        res.status(200).json({msg: "Blog Created", post: newPost});
    }
    catch (err) {
        const status = 401;
        const message = "Blog Could Not be Created";
        const errorDetails = {
            message,
            status
        }
        next(errorDetails);
    }
}

const getBlogs = async (req, res, next) => {
    try {
        const reversedOutput = await BlogEntry.find();
        const output = reversedOutput.reverse();
        res.status(200).json({msg: "All Blogs Returned", allEntries: output});
    }
    catch (err) {
        const status = 404;
        const message = "Error Fetching All Blogs";
        const errorDetails = {
            message,
            status
        };
        next(errorDetails);
    }
}

const getBlogsByTag = async (req, res, next) => {
    const {tag} = req.body;
    try {
        const reversedOutput = await BlogEntry.find({ tags: { $in: tag } });
        const output = reversedOutput.reverse();
        res.status(200).json({msg: `All Blogs by Tag ${tag} Returned`, allEntries: output});
    }
    catch (err) {
        const status = 404;
        const message = `Error Fetching Blogs of ${tag}`;
        const errorDetails = {
            message,
            status
        };
        next(errorDetails);
    }
}

const getUserBlogs = async (req, res, next) => {
    try {
        const {userID} = req.body;
        const reversedOutput = await BlogEntry.find({userID});
        const output = reversedOutput.reverse();
        res.status(200).json({msg: "All Blogs by User Returned", allEntries: output});
    }
    catch (err) {
        const status = 404;
        const message = "Error Fetching Blogs by User";
        const errorDetails = {
            message,
            status
        };
        next(errorDetails);
    }
}


const deleteBlog = async (req, res, next) => {
    try {
        const {blogID} = req.body;
        const output = await BlogEntry.deleteOne({_id: blogID});
        res.status(200).json({msg: "Successfully Deleted Blog"});
    }
    catch (err) {
        const status = 404;
        const message = "Error Deleting Blog";
        const errorDetails = {
            message,
            status
        };
        next(errorDetails);
    }
}

export {newBlog, getBlogs, deleteBlog, getUserBlogs, getBlogsByTag};
