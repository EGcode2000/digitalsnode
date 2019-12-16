const mongoose = require('mongoose');

invoiceSchema = mongoose.Schema({

    _UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _MemberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    _SynagogueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Synagogue',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

invoiceSchema.virtual('synagogueInfo', {
    ref: 'Synagogue',
    localField: '_SynagogueId',
    foreignField: '_id'
});

invoiceSchema.virtual('userInfo', {
    ref: 'User',
    localField: '_UserId',
    foreignField: '_id'
});

invoiceSchema.virtual('memberInfo', {
    ref: 'Member',
    localField: '_MemberId',
    foreignField: '_id'
});


invoiceSchema.set('toObject', { virtuals: true });
invoiceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Invoice", invoiceSchema);