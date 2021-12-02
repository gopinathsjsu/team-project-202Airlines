const express = require("express");
const { checkAuth } = require("./utils/auth");

//
const { demoCall } = require("./controllers/demoController");
const {
  getBookingHistory,
  cancelFlightBooking,
  updateFlightBooking,
  getUserProfile,
  updatePassport,
  createBooking,
  getTravellers,
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
router.route("/demoCall").post(checkAuth,demoCall);
router.route("/signinData").post(signin);
router.route("/getLogin").get(checkAuth,getLogin);
router.route("/signout").get(checkAuth,signout);
router.route("/register").post(registerUser);
router.route("/mileage").get(checkAuth,getMileage);
router.route("/addMiles").post(checkAuth,addMiles);
router.route("/getBookingHistory").get(checkAuth,getBookingHistory);
router.route("/cancelFlightBookingCharges").post(checkAuth,cancelFlightBooking);
router.route("/cancelFlightBookingRefund").post(checkAuth,cancelFlightBooking);
router.route("/updateBooking/:id").get(checkAuth,updateFlightBooking);
//flight
router.route("/flightList").post(checkAuth,getFlightList);
//employer
router.route("/getProfile").get(checkAuth,getProfile);
router.route("/getFlights").get(checkAuth,getFlights);
router.route("/getFlightsById/:flightId").get(checkAuth,getFlightsById);
router.route("/addFlights").post(checkAuth,addFlights);
router.route("/editFlights").post(checkAuth,editFlights);
router.route("/getAirportCode").get(checkAuth,getAirportCode);
router.route("/getUserProfile").get(checkAuth,getUserProfile);
router.route("/updatePassport").post(checkAuth,updatePassport);
router.route("/getSeatInfo").get(checkAuth,getSeatInfo);
router.route("/createBooking").post(checkAuth,createBooking);
router.route("/getTravellers").get(checkAuth,getTravellers);

module.exports = router;
