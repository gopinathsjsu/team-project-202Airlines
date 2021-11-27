const express = require("express");

//
const { demoCall } = require("./controllers/demoController");
const {
  getBookingHistory,
  cancelFlightBooking,
  updateFlightBooking,
  getPassport,
  updatePassport,
  createBooking,
} = require("./controllers/bookingHistoryController");
const {
  getFlightList,
  getSeatInfo,
} = require("./controllers/flightDetailsController");
const {
  getProfile,
  getFlights,
  getFlightsById,
  addFlights,
  editFlights,
  getAirportCode,
  getMileage,
  addMiles,
} = require("./controllers/adminController");

const {
  signin,
  registerUser,
  getLogin,
  signout,
} = require("./controllers/accountController");

const router = express.Router();

// demo
router.route("/demoCall").post(demoCall);
router.route("/signinData").post(signin);
router.route("/getLogin").get(getLogin);
router.route("/signout").get(signout);
router.route("/register").post(registerUser);
router.route("/mileage").get(getMileage);
router.route("/addMiles").post(addMiles);
router.route("/getBookingHistory").get(getBookingHistory);
router.route("/cancelFlightBookingCharges").post(cancelFlightBooking);
router.route("/cancelFlightBookingRefund").post(cancelFlightBooking);
router.route("/updateBooking/:id").get(updateFlightBooking);
//flight
router.route("/flightList").post(getFlightList);
//employer
router.route("/getProfile").get(getProfile);
router.route("/getFlights").get(getFlights);
router.route("/getFlightsById/:flightId").get(getFlightsById);
router.route("/addFlights").post(addFlights);
router.route("/editFlights").post(editFlights);
router.route("/getAirportCode").get(getAirportCode);
router.route("/getPassport").get(getPassport);
router.route("/updatePassport").post(updatePassport);
router.route("/getSeatInfo").get(getSeatInfo);
router.route("/createBooking").post(createBooking);

module.exports = router;
