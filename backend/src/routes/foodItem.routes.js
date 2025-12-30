const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");
const foodPartnerController = require("../controllers/food-partner.controller");


const upload = multer({
    storage: multer.memoryStorage(),
})

//post  /api/food [protected]
router.post("/",
    authMiddleware.authFoodPartnerMiddelware,
    upload.single("video"),
    foodController.createFoodItem
)


//get  /api/food [protected]

router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems,
)

//get /api/food/food-partner/:id

router.get("/food-partner/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById
)

//post /api/food/

router.post("/like",
    authMiddleware.authUserMiddleware,
    foodController.likeFoodItem
)

router.post("/save",
    authMiddleware.authUserMiddleware,
    foodController.saveFoodItem
)

//get /api/food/saved
router.get("/saved",
    authMiddleware.authUserMiddleware,
    foodController.getSavedFoodItems
)


module.exports = router;