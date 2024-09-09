/**
 * Created by Syed Afzal
 */
const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: false,
    }
});

module.exports = { Todo };
