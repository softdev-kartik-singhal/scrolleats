const foodPartnerModel = require("../models/foodPartner.model");
const foodItemModel = require("../models/foodItem.model");

async function getFoodPartnerById(req, res) {
  try {
    const partnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(partnerId);

    const foodItems = await foodItemModel.find({
      foodPartner: partnerId
    });

    return res.status(200).json({
      foodPartner,
      foodItems
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getFoodPartnerById };
