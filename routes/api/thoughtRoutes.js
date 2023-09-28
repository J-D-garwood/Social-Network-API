//establishing thought routes
const router = require('express').Router();
const {
    getThoughts,
    newThought,
    getOneThought,
    updateThought,
    deleteThought,
    addReaction,
    pullReaction
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(newThought)

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(pullReaction)

module.exports = router;
