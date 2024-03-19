const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({

    //the user who send the freinds req
    from_user:{
        type: mongoose.Schema.Types.objectId,
        ref: 'User'
    },
    // the user who accepted this request, the naming is just to understand, otherwise, the users won't see a difference
    to_user:{
        type: mongoose.Schema.Types.objectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const Friendship = mongoose.model('Freindship', friendshipSchema);
module.exports = Friendship; 