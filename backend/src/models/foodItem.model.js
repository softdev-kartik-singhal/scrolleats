const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    video: {
      type: String,
      required: true
    },

    description: {
      type: String,
      trim: true
    },

    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodPartner",
      required: true
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

const foodItemModel = mongoose.model("foodItem", foodItemSchema);

module.exports = foodItemModel;