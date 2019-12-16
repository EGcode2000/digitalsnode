const mongoose = require('mongoose');

synagogueSchema = mongoose.Schema({
    
    //not sure if userslistID is needed. because we can get it from the user id. no need for db transaction
    _UsersListId: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    urlPath: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

    synagogueSchema.virtual('userListInfo', {
        ref: 'User',
        localField: '_UsersListId',
        foreignField: '_id'
    });

    synagogueSchema.set('toObject', { virtuals: true });
    synagogueSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Synagogue", synagogueSchema);