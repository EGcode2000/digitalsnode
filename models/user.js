const mongoose = require('mongoose');

usersSchema = mongoose.Schema({
    _SynagogueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Synagogue',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
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
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

usersSchema.virtual('synagogueInfo', {
    ref: 'Synagogue',
    localField: '_SynagogueId',
    foreignField: '_id'
})


usersSchema.set('toObject', { virtuals: true });
usersSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("User", usersSchema);