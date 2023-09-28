const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// initialising thoughtSchema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            ref: 'User'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON:{
            getters: true, //add timestamp formatter
            virtuals: true,
        },
        id: false,
    }
);
//adding reaction count virtual
thoughtSchema.virtual('reactionCount').get( function() {
    return this.reactions.length;
})
// establising thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;