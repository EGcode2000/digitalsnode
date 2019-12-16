const express = require('express');
const router = express.Router();
const Member = require('../models/member.js');


// Members schema

router.get("/", (req, res) => {
    Member.find().sort({ name: 1 })
    .populate('synagogueInfo')
    .then(members => {
        res.json(members);
    }, err => {
        console.log(err);
    });
});


router.get("/:id", (req, res) => {
    let memberId = (req.params.id);
    Member.findById(memberId)
    .populate('synagogueInfo')
    .then(Member => {
        res.json(Member);
    }, err => {
        console.log(err);
    });
});

router.post("/", (req, res) => {
    if (!checkIfMemberValid(req.body)) {
        return res.sendStatus(400);
    }
    
    let member = new Member(req.body);
    member.save().then(newMember => {
        console.log("Member saved successfully");
        res.json(newMember);
    }, err => {
        res.send(err);
    });
});

router.put("/",(req,res) => {
    if (!checkIfMemberValid(req.body)) {
        return res.sendStatus(400);
    }
    let member = (req.body);
    Member.findByIdAndUpdate(member._id,member,
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        (err, member) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(member);
        }
    )
});

router.delete("/:id", (req, res) => {

    let memberId = (req.params.id);
    Member.findByIdAndRemove(memberId, (err, memberObj) => {  
        //handle any potential errors:
        if (err) return res.status(500).send(err);
        //create a simple object to send back with a message and the id of the document that was removed
        const response = {
            message: "Member successfully deleted",
            objDeleted: memberObj 
        };
        return res.status(200).send(response);
    });
});


function checkIfMemberValid(obj) {
    if ((!obj) || (!obj._SynagogueId) || (!obj.firstName) || (!obj.lastName) || (!obj.email) || (!obj.address)) {
        return false;
    }
    return true;
}

module.exports = router;