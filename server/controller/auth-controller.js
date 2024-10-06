import express from "express";
import User from "../models/user-model.js";

const home = async (req, res, next)=> {
    try{
        res.status(200).send({msg: "Home Page"});
    }
    catch (err) {
        const status = 404;
        const message = "Error Fetching home page";
        const errorDetails = {
            message,
            status
        };
        next(errorDetails);
    }
};

const login = async (req, res, next)=> {
    try{
        const {email, password } = req.body;
        const userExists = await User.findOne({email});
        if (!userExists) {
            return res.status(400).json({message: "Error: Invalid Credentials"});
        }
        const correctPass = await userExists.checkPassword(password);
        if (correctPass) {
            return res.status(200).json({msg: "Login Successful", token: await userExists.generateToken(), userId: userExists._id.toString()});
        }
        else {
            return res.status(400).json({message: "Error: Invalid Credentials"});
        }
    }
    catch (err) {
        const status = 404;
        const message = "Error Logging user";
        const errorDetails = {
            message,
            status
        };
        next(errorDetails);
    }
};

const register = async (req, res, next)=> {
    try{
        const {username, phone, email, password} = req.body;
        const userExists = await User.findOne({
            $or: [
                { username: username },
                { phone: phone },
                { email: email }
            ]
        });
        if (userExists) {
            return res.status(400).json({message: "User Already Exists"});
        }
        const newUser = await User.create({username, phone, email, password});
        res.status(200).json({msg: "Registration Successful", token: await newUser.generateToken(), userId: newUser._id.toString()});
    }
    catch (err) {
        const status = 404;
        const message = "Error Registering user";
        const errorDetails = {
            message,
            status
        };
        next(errorDetails);
    }
};

const user = async (req, res, next) => {
    try {
        const userData = req.user;
        return res.status(200).json({msg: userData});
    }
    catch (err) {
        const status = 404;
        const message = "Error Fetching user";
        const errorDetails = {
            message,
            status
        };
        next(errorDetails);
    }
}

export {login, register, home, user};