const foodItemModel = require("../models/foodItem.model");
const storageService = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");

async function createFoodItem(req, res) {


  console.log(req.foodPartner);
  console.log(req.body);
  console.log(req.file);

  const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuidv4())

  const foodItem = await foodItemModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id
  })

  res.status(201).json({
    message: "Food Item listed Successfully",
    food: foodItem
  })

}

async function getFoodItems(req, res) {
  const userId = req.user?.id;

  const foodItems = await foodItemModel.find().lean();

  const foodIds = foodItems.map(f => f._id);

  const likes = await likeModel.find({ food: { $in: foodIds } });
  const saves = await saveModel.find({ food: { $in: foodIds } });

  const likesMap = {};
  const savesMap = {};

  likes.forEach(l => {
    if (!likesMap[l.food]) likesMap[l.food] = [];
    likesMap[l.food].push(l.user.toString());
  });

  saves.forEach(s => {
    if (!savesMap[s.food]) savesMap[s.food] = [];
    savesMap[s.food].push(s.user.toString());
  });

  const formatted = foodItems.map(food => ({
    ...food,
    likesCount: likesMap[food._id]?.length || 0,
    likedBy: likesMap[food._id] || [],
    savedBy: savesMap[food._id] || []
  }));

  res.status(200).json({
    message: "Food Items fetched successfully",
    foodItems: formatted
  });
}


async function likeFoodItem(req, res) {
  const userId = req.user.id;
  const { foodId } = req.body;

  const existing = await likeModel.findOne({ user: userId, food: foodId });

  if (existing) {
    await likeModel.deleteOne({ _id: existing._id });

    await foodItemModel.findByIdAndUpdate(foodId, {
      $inc: { likesCount: -1 },
      $pull: { likes: userId }
    });

    return res.json({
      liked: false,
      message: "Unliked"
    });
  }

  await likeModel.create({
    user: userId,
    food: foodId
  });

  await foodItemModel.findByIdAndUpdate(foodId, {
    $inc: { likesCount: 1 },
    $addToSet: { likes: userId }
  });

  return res.json({
    liked: true,
    message: "Liked"
  });
}

async function saveFoodItem(req, res) {

  const userId = req.user.id;
  const { foodId } = req.body;

  const existing = await saveModel.findOne({ user: userId, food: foodId });

  if (existing) {
    await saveModel.deleteOne({ _id: existing._id });

    await foodItemModel.findByIdAndUpdate(foodId, {
      $pull: { saves: userId }
    });

    return res.json({ saved: false });
  }

  await saveModel.create({ user: userId, food: foodId });

  await foodItemModel.findByIdAndUpdate(foodId, {
    $addToSet: { saves: userId }
  });

  return res.json({ saved: true });

}


async function getSavedFoodItems(req, res) {
  try {
    const userId = req.user.id;

    // Find all saves for this user and populate the food items
    const savedItems = await saveModel
      .find({ user: userId })
      .populate('food')
      .lean();

    // Extract the food items
    const foodItems = savedItems
      .map(item => item.food)
      .filter(food => food !== null); // Filter out any null values

    if (!foodItems.length) {
      return res.status(200).json({
        message: "No saved items found",
        foodItems: []
      });
    }

    // Get food IDs
    const foodIds = foodItems.map(f => f._id);

    // Fetch likes and saves for these foods
    const likes = await likeModel.find({ food: { $in: foodIds } });
    const saves = await saveModel.find({ food: { $in: foodIds } });

    // Create maps for likes and saves
    const likesMap = {};
    const savesMap = {};

    likes.forEach(l => {
      if (!likesMap[l.food]) likesMap[l.food] = [];
      likesMap[l.food].push(l.user.toString());
    });

    saves.forEach(s => {
      if (!savesMap[s.food]) savesMap[s.food] = [];
      savesMap[s.food].push(s.user.toString());
    });

    // Format the response
    const formatted = foodItems.map(food => ({
      ...food,
      likesCount: likesMap[food._id]?.length || 0,
      likedBy: likesMap[food._id] || [],
      savedBy: savesMap[food._id] || []
    }));

    res.status(200).json({
      message: "Saved items fetched successfully",
      foodItems: formatted
    });
  } catch (error) {
    console.error("Error fetching saved items:", error);
    res.status(500).json({
      message: "Error fetching saved items",
      error: error.message
    });
  }
}

module.exports = { createFoodItem, getFoodItems, likeFoodItem, saveFoodItem, getSavedFoodItems };