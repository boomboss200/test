const express = require("express")
const { loginController,
     registerController,
      authController , 
      applydoctorController, 
      getAllNotificationController, 
      deleteAllNotificationController, 
      getAllDoctorsController,
      bookeAppointmnetController,
      bookingAvailabilityController,
      userAppointmentsController
} = require("../controllers/userCtrl")
const authMiddleware = require("../middlewares/authMiddleware")

//router object
const router = express.Router();

//routes
//login route
router.post("/login",loginController);

//register route
router.post("/register", registerController);


//Auth 
router.post("/getUserData",authMiddleware, authController);

//Apply-Doctor  
router.post("/apply-doctor",authMiddleware, applydoctorController);

//notification 
router.post("/get-all-notification",authMiddleware, getAllNotificationController);

//delete notification 
router.post("/delete-all-notification",authMiddleware, deleteAllNotificationController);

//get all doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController)

//book appointments 
router.post("/book-appointment",authMiddleware,bookeAppointmnetController)

router.post("/infodoc",authMiddleware,bookeAppointmnetController)


//booking availablity 
router.post("/booking-availability", authMiddleware, bookingAvailabilityController)

//apointments list
router.get("/user-appointments", authMiddleware , userAppointmentsController)


module.exports = router