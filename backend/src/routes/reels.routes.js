const express = require("express");
const reelsController = require("../controllers/reels.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");
const foodPartnerController = require("../controllers/food-partner.controller");


const upload = multer({
    storage: multer.memoryStorage(),
})

//post  /api/reels [protected]
router.post("/",
    authMiddleware.authFoodPartnerMiddelware,
    upload.single("video"),
    reelsController.createFoodItem
)


//get  /api/reels [protected]

router.get("/",
    authMiddleware.authUserMiddleware,
    reelsController.getFoodItems,
)

//get /api/reels/food-partner/:id

router.get("/food-partner/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById
)

//post /api/reels/like

router.post("/like",
    authMiddleware.authUserMiddleware,
    reelsController.likeFoodItem
)

router.post("/save",
    authMiddleware.authUserMiddleware,
    reelsController.saveFoodItem
)

//get /api/reels/saved
router.get("/saved",
    authMiddleware.authUserMiddleware,
    reelsController.getSavedFoodItems
)


module.exports = router;