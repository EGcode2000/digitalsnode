const mongoose = require('mongoose');

memberSchema = mongoose.Schema({
    _SynagogueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Synagogue',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        default: null,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

memberSchema.virtual('synagogueInfo', {
    ref: 'Synagogue',
    localField: '_SynagogueId',
    foreignField: '_id'
})


memberSchema.set('toObject', { virtuals: true });
memberSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Member", memberSchema);