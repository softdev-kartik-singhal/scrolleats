const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saveSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodItem",
        required: true
    }
}, {
    timestamps: true
})

const SaveModel = mongoose.model("save", saveSchema);
module.exports = SaveModel;