const express = require("express");

//
const { demoCall } = require("./controllers/demoController");
const { signin } = require("./controllers/accountController");
const {
  getBookingHistory,
  cancelFlightBooking,
  updateFlightBooking,
} = require("./controllers/bookingHistoryController");
const { getFlightList } = require("./controllers/flightDetailsController");
const {
  getProfile,
  getFlights,
  getFlightsById,
  addFlights,
  editFlights,
  getAirportCode,
} = require("./controllers/adminController");

const router = express.Router();

// demo
router.route("/demoCall").post(demoCall);
router.route("/signin").post(signin);
router.route("/getBookingHistory").get(getBookingHistory);
router.route("/cancelFlightBooking").post(cancelFlightBooking);
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

module.exports = router;
