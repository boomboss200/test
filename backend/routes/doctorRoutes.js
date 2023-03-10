const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const  {getDoctorInfoController, updateProfileController,getDoctorByIdController, doctorAppointmentsController,updateStatusController} = require("../controllers/doctorCtrl")


const router = express.Router()

//post single doctor info
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController)

//post update profile
router.post("/updateProfile", authMiddleware, updateProfileController)

//post get single doctor infp
router.post("/getDoctorById", authMiddleware, getDoctorByIdController)

//get appointment for doctors
router.get("/doctor-appointments", authMiddleware, doctorAppointmentsController)

//post update status of appointmnet 
router.post("/update-status", authMiddleware, updateStatusController)
module.exports = router