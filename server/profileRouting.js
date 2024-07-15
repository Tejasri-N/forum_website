const express = require('express')
const client = require('./db')

const profileRoute = express.Router()

const resetBio = async(req,res) =>{
    const newBio = req.body.data.text
    const user = req.params.username
    // console.log(newBio)
    // console.log(user)
    try {
        await client.query(
            'UPDATE users_profile SET bio = ($1) where username = ($2)',
            [newBio,user]
        )
        res.json({status : "ok"})
    } catch (error) {
        console.error(error);
        return res.json({ status: "error", error: "Internal server error" }); 
    }
}

const showBio = async(req,res) =>{
    const user = req.params.username
    
    try {
        const bio = await client.query(
            'SELECT bio FROM users_profile WHERE username = ($1)',
            [user]
        )
        const text = bio.rows[0]
        res.json({msg : text.bio})
    } catch (error) {
        console.error(error); 
        return res.json({ status: "error", error: "Internal server error" }); 
    }
}

const resetDp = async(req,res) =>{
    const user = req.params.username
    const img = req.body.base64String
    try {
        await client.query(
            'UPDATE users_profile SET profile_pic = ($1) where username = ($2)',
            [img,user]
        )
        res.json({status: "ok"})
    } catch (error) {
        console.error(error);
        return res.json({ status: "error", error: "Internal server error" }); 
    }
}

const showDp = async(req,res) =>{
    const user = req.params.username
    
    try {
        const dp = await client.query(
            'SELECT profile_pic FROM users_profile WHERE username = ($1)',
            [user]
        )
        const text = dp.rows[0]
        res.json({msg : text.profile_pic})
    } catch (error) {
        console.error(error); 
        return res.json({ status: "error", error: "Internal server error" }); 
    }
}

profileRoute.put("/saveBio/:username",resetBio)
profileRoute.get("/showBio/:username",showBio)
profileRoute.put("/saveDp/:username",resetDp)
profileRoute.get("/showDp/:username",showDp)

module.exports = profileRoute;