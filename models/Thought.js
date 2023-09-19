const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

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
            virtuals: true,
        }
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;