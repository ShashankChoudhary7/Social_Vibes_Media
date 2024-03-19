const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.objectId,
        ref: 'User'
    },
    //include the array of ids of all comments in this post Schema itself
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
     timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;