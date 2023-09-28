//establishing user routes
const router = require('express').Router()
const {
    getUsers,
    createUser,
    getOneUser,
    deleteUser,
    updateUser,
    addNewFriend,
    removeFriend
} = require("../../controllers/userController")

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getOneUser).delete(deleteUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(addNewFriend).delete(removeFriend);

module.exports = router;
