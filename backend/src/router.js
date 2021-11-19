const express = require("express");

//
const { demoCall } = require("./controllers/demoController");
const {
  signin,
  registerUser,
  getLogin,
  signout,
} = require("./controllers/accountController");
const {
  getBookingHistory,
  cancelFlightBooking,
} = require("./controllers/bookingHistoryController");
const router = express.Router();

// demo
router.route("/demoCall").post(demoCall);
router.route("/signinData").post(signin);
router.route("/getLogin").get(getLogin);
router.route("/signout").get(signout);
router.route("/register").post(registerUser);
router.route("/getBookingHistory").get(getBookingHistory);
router.route("/cancelFlightBooking").post(cancelFlightBooking);
module.exports = router;
