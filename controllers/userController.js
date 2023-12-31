// importing...
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
    // function to get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users
            }

            res.json(userObj)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // function to create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // function to get one user
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            res.json({ user })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // function to delete one user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId })
            const thought = await Thought.deleteMany({ username: user.username })
            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }
            ///PUT SOMETHING HERE TO DELETE ALL STUDENTs THOUGHTS

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // function to update one user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!user) {
                res.status(404).json({ message: 'No course with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // function to add a friend to a user (and vice versa that user to their new friend)
    async addNewFriend(req, res) {
        try {

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            )
            
            if(!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            const friend = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: req.params.userId }},
                { runValidators: true, new: true }
            )
            if(!friend) {
                return res.status(404).json({ message: 'No friend found with that ID' });
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // function to remove a friend
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            );
            if(!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            const friend = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: req.params.userId }},
                { runValidators: true, new: true }
            );
            if(!friend) {
                return res.status(404).json({ message: 'No friend found with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
