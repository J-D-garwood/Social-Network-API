// importing models and ObjectId 
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// exporting CRUD request functions for thought model
module.exports = {
    // function to get all thoughts
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
    // function to add a new thought
    async newThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                {username: thought.username },
                {$addToSet: { thoughts: thought }},
                { runValidators: true, new: true }
            )
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // function to get a single thought
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
    // function to update a single thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!thought) {
                res.status(404).json( {message: 'No thought with this ID '})
            }

            const user = await User.findOneAndUpdate(
                {username: thought.username },
                {$addToSet: { thoughts: thought }},
                { runValidators: true, new: true }
            )

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // function to delete one thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId })
            
            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' });
            }
            const user = await User.findOneAndUpdate(
                {username: thought.username },
                {$pull: { thoughts: {_id: req.params.thoughtId}}},
                { runValidators: true, new: true }
            )

            res.json({message: 'Thought successfully removed' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //function to add a reaction
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
    // function to delete a reaction
    async pullReaction(req, res) {
        try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
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
