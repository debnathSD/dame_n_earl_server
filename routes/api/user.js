const express = require("express");
const keys = require("../../config/keys");

const router = express.Router();

// Load Auth and User Model
const Auth = require("../../models/Auth");
const User = require("../../models/User")

/**
 * @route   POST /api/v1/auth/userdetails
 * @desc    Update the user details
 * @access  Public
 */

 router.post("/userdetails", (req,res) => {
    Auth.findOne({email: req.body.email}).then((user) => {
        if(user){
            
        }
        else{
            return res.status(400).json({email: "Please Register/Login!!"})
        }
    });
 });