const express = require('express');

//
const { demoCall } = require('./controllers/demoController');
const { signin } = require('./controllers/accountController');
const { getBookingHistory,cancelFlightBooking } =require('./controllers/bookingHistoryController');
const {getFlightList} = require("./controllers/flightDetailsController");


const router = express.Router();

// demo
router.route('/demoCall').post(demoCall);
router.route('/signin').post(signin);
router.route('/getBookingHistory').get(getBookingHistory);
router.route('/cancelFlightBooking').post(cancelFlightBooking);
//flight
router.route('/flightList/:details').get(getFlightList);

module.exports = router;



