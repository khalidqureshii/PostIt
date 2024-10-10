import express from "express";
import * as BlogControllers from "../controller/blog-controller.js";

const blogRouter = express.Router();

blogRouter.route("/newBlog").post(BlogControllers.newBlog);
blogRouter.route("/getBlogs").get(BlogControllers.getBlogs);
blogRouter.route("/deleteBlog").delete(BlogControllers.deleteBlog);
blogRouter.route("/getUserBlogs").post(BlogControllers.getUserBlogs);
blogRouter.route("/getBlogsByTag").post(BlogControllers.getBlogsByTag);

export default blogRouter;