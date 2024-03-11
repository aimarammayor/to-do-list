const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    },
    tags: [String] // Campo para almacenar etiquetas
});

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = TodoModel;
