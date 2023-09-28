const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            const thoughtObj = {
                thoughts,
            };

            res.json(thoughtObj)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async newThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json({
                thought,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!thought) {
                res.status(404).json( {message: 'No thought with this ID '})
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId })
            
            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' });
            }

            res.json({message: 'Thought successfully removed' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                .status(404)
                .json({ message: 'No thought found with that ID' });   
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async pullReaction(req, res) {
        try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
            .status(404)
            .json({ message: 'No thought found with that ID' });   
        };

        res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
