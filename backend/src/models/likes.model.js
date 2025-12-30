const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        required: true
    }
}, {
    timestamps: true
})

const LikesModel = mongoose.model("like", likeSchema);
module.exports = LikesModel;