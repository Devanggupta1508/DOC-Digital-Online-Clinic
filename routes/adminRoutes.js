const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");

const authMiddleware = require("../middlewares/authMiddleware");
const Doctor = require("../models/doctorModel");

const router = express.Router();

// USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

// DELETE DOCTOR
router.post("/doctor/delete", authMiddleware, async (req, res) => {
  try {
    const { doctorId } = req.body;

    await Doctor.findByIdAndDelete(doctorId);

    res.json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
});

module.exports = router;