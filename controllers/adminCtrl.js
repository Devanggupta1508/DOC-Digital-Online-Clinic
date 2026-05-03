const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

// GET USERS
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};

// GET DOCTORS
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};

// STATUS CHANGE
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    const doctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { status },
      { new: true }
    );

    const user = await userModel.findById(doctor.userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const notification = user.notification || [];

    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status}`,
      onClickPath: "/notification",
    });

    user.notification = notification;
    user.isDoctor = status === "approved";
    await user.save();

    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
};