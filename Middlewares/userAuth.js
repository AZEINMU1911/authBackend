const express = require ('express')
const db = require ('../Models')

const User = db.user

// checking if user data has been used logic
const checkUserExistance = async(req,res,next) => {
    try {
        //Checking for used username
        const existingUsername = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });
        // if its used returns "Username taken"
        if (existingUsername){
            return res.status(409).json({error : "Username taken"})
        }

        //checking for used email
        const existingEmail = await User.findOne({
            where : {
                email : req.body.email
            }
        });
        // if its used return "Email is in use"
        if (existingEmail){
            return res.status(409).json({error : "Email is in use"})
        }
        // if both email and username is not in use proceed
        next();
    } catch (error){
        console.log (error)
        return res.status(501).json({error : "Inrernal server error"})
    }
}

module.exports = {
    checkUserExistance,
}