const router = require('express').Router();
const {
    getThoughts,
    newThought,
    getOneThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(newThought)

router.route(':/thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)

module.exports = router;
