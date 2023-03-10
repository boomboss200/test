const express = require("express")
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController} = require("../controllers/adminCtrl")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

//get method for users

router.get("/getAllUsers",authMiddleware ,getAllUsersController )

//get all doctors
router.get("/getAllDoctors",authMiddleware ,getAllDoctorsController )

//Post account status
router.post("/changeAccountStatus", authMiddleware, changeAccountStatusController)

module.exports = router