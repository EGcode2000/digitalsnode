const express = require('express');
const router = express.Router();
const User = require('../models/user.js');



// Users schema

router.get("/", (req, res) => {
    User.find().sort({ name: 1 })
    .populate('synagogueInfo')
    .then(users => {
        res.json(users);
    }, err => {
        console.log(err);
        logger.error("We have an error!",err);
        res.send("Something went wrong");
    });
});

router.get("/:id", (req, res) => {
    let userId = (req.params.id);
    User.findById(userId)
    .populate('synagogueInfo')
    .then(User => {
        res.json(User);
    }, err => {
        logger.error("We have an error!",err);
        res.send("Something went wrong");
    });
});

router.post("/", (req, res) => {
    if (!checkIfUserValid(req.body)) {
        return res.sendStatus(400);
    }
    
    let user = new User(req.body);
    user.save().then(newUser => {
        console.log("User saved successfully");
        res.json(newUser);
    }, err => {
        logger.error("We have an error!",err);
        res.send("Something went wrong");
    });
});

router.put("/",(req,res) => {
    if (!checkIfUserValid(req.body)) {
        return res.sendStatus(400);
    }
    let user = (req.body);
    User.findByIdAndUpdate(user._id,user,
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        (err, user) => {
        // Handle any possible database errors
            if (err){
                logger.error("We have an error!",err);
                res.send("Something went wrong");
            } 
            return res.send(user);
        }
    )
});

router.delete("/:id", (req, res) => {

    let userId = (req.params.id);
    User.findByIdAndRemove(userId, (err, userObj) => {  
        //handle any potential errors:
        if (err) {
            logger.error("We have an error!",err);
            res.send("Something went wrong");            
        }
        //create a simple object to send back with a message and the id of the document that was removed
        const response = {
            message: "User successfully deleted",
            objDeleted: userObj 
        };
        return res.status(200).send(response);
    });
});


function checkIfUserValid(obj) {
    if ((!obj) || (!obj._SynagogueId) || (!obj.username) || (!obj.password) || (!obj.email) || (!obj.firstName) || (!obj.lastName)) {
        return false;
    }
    return true;
}

module.exports = router;