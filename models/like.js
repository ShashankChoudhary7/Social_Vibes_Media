const mongoogse = require('mongoose');

const likeSchema = new mongoogse.Schema({
    user: {
        type: mongoogse.Schema.objectId
    },
     // this defines the object id of the liked object
    likeable: {
        type: mongoogse.Schema.objectId,
        required: true,
        refPath: 'onModel'
    },
     // this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
           type: String,
           require: true,
           enum: ['Post', 'Comment']
    }
},{
    timeStamps : true
});

const Like = mongoogse.model('Like', likeSchema);
module.exports = Like;