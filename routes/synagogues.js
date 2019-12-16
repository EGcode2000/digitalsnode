const express = require('express');
const router = express.Router();
const Synagogue = require('../models/synagogue.js');



// Synagogues schema

router.get("/", (req, res) => {
    Synagogue.find().sort({ name: 1 })
    .populate('userListInfo')
    .then(synagogues => {
        res.json(synagogues);
    }, err => {
        console.log(err);
    });
});


router.get("/:id", (req, res) => {
    let synagogueId = (req.params.id);
    Synagogue.findById(synagogueId)
    .populate('userListInfo')
    .then(Synagogue => {
        res.json(Synagogue);
    }, err => {
        console.log(err);
    });
});

router.post("/", (req, res) => {
    if (!checkIfSynagogueValid(req.body)) {
        return res.sendStatus(400);
    }
    
    let synagogue = new Synagogue(req.body);
    synagogue.save().then(newSynagogue => {
        console.log("Synagogue saved successfully");
        res.json(newSynagogue);
    }, err => {
        res.send(err);
    });
});

router.put("/",(req,res) => {
    if (!checkIfSynagogueValid(req.body)) {
        return res.sendStatus(400);
    }
    let synagogue = (req.body);
    Synagogue.findByIdAndUpdate(synagogue._id,synagogue,
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        (err, synagogue) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(synagogue);
        }
    )
});

router.delete("/:id", (req, res) => {

    let synagogueId = (req.params.id);
    Synagogue.findByIdAndRemove(synagogueId, (err, synagogueObj) => {  
        //handle any potential errors:
        if (err) return res.status(500).send(err);
        //create a simple object to send back with a message and the id of the document that was removed
        const response = {
            message: "Synagogue successfully deleted",
            objDeleted: synagogueObj 
        };
        return res.status(200).send(response);
    });
});


function checkIfSynagogueValid(obj) {
    if ((!obj) || (!obj.name) || (!obj.urlPath) || (!obj.address || (obj.length >10)) ) {
        return false;
    }
    return true;
}

module.exports = router;