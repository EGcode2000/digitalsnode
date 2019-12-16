const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice.js');



// Invoices schema

router.get("/", (req, res) => {
    Invoice.find().sort({ name: 1 })
    .populate('synagogueInfo')
    .populate('userInfo')
    .populate('memberInfo')
    .then(invoices => {
        res.json(invoices);
    }, err => {
        console.log(err);
    });
});


router.get("/:id", (req, res) => {
    let invoiceId = (req.params.id);
    Invoice.findById(invoiceId)
    .populate('synagogueInfo')
    .populate('userInfo')
    .populate('memberInfo')
    .then(Invoice => {
        res.json(Invoice);
    }, err => {
        console.log(err);
    });
});

router.post("/", (req, res) => {
    if (!checkIfinvoiceValid(req.body)) {
        return res.sendStatus(400);
    }
    
    let invoice = new Invoice(req.body);
    invoice.save().then(newinvoice => {
        console.log("Invoice saved successfully");
        res.json(newinvoice);
    }, err => {
        res.send(err);
    });
});

router.put("/",(req,res) => {
    if (!checkIfinvoiceValid(req.body)) {
        return res.sendStatus(400);
    }
    let invoice = (req.body);
    Invoice.findByIdAndUpdate(invoice._id,invoice,
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        (err, invoice) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(invoice);
        }
    )
});

router.delete("/:id", (req, res) => {

    let invoiceId = (req.params.id);
    Invoice.findByIdAndRemove(invoiceId, (err, invoiceObj) => {  
        //handle any potential errors:
        if (err) return res.status(500).send(err);
        //create a simple object to send back with a message and the id of the document that was removed
        const response = {
            message: "Invoice successfully deleted",
            objDeleted: invoiceObj 
        };
        return res.status(200).send(response);
    });
});


function checkIfinvoiceValid(obj) {
    if ((!obj) || (!obj._UserId) || (!obj._MemberId) || (!obj._SynagogueId) || (!obj.title) || (!obj.amount) || (!obj.description) ) {
        return false;
    }
    return true;
}

module.exports = router;