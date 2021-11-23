const conn = require("../utils/dbConnector");
const SQL_BOOKING = require("../Database/booking");
//Get all bookking details

const getBookingHistory = (req, res) => {
  // if (!req.session.user) {
  //   res.status(404).send({ err: "Invalid user session" });
  //   return;
  // }
  conn.query(
    SQL_BOOKING.GET_BOOKING_HISTORY,
    [req.body.customer_id],
    (error, result) => {
      //  console.log(result);
      if (error) {
        res.status(404).send({ err: error.code });
      } else if (result.length == 0) {
        res.send([]);
      } else {
        res.send(result);
      }
    }
  );
};

const cancelFlightBooking = (req, res) => {
  // if (!req.session.user) {
  //   res.status(404).send({ err: "Invalid user session" });
  //   return;
  // }
  // console.log(req.body);
  conn.query(
    SQL_BOOKING.CANCEL_BOOKING,
    [req.body.booking_id],
    (error, result) => {
      if (error) {
        res.status(404).send({ err: error.code });
        return;
      } else if (result.length == 0) {
        res.send([]);
      } else {
        // console.log("cancel");
        if (req.body.total_miles != 0) {
          conn.query(
            SQL_BOOKING.CANCEL_BOOKING_MILES,
            [req.body.total_miles],
            (err, results) => {
              // console.log(req.body.total_miles);
              res.send(results);
            }
          );
        } else {
          res.send(result);
        }
      }
    }
  );
};

const updateFlightBooking = (req, res) => {
  // if (!req.session.user) {
  //   res.status(404).send({ err: "Invalid user session" });
  //   return;
  // }
  const booking_id = req.params.id;
  conn.query(
    SQL_BOOKING.GET_BOOKING_FOR_UPDATE,
    [booking_id],
    (error, result) => {
      if (error) {
        res.status(404).send({ err: error.code });
        return;
      } else if (result.length == 0) {
        res.send([]);
      } else {
        // console.log("update");
        res.send(result);
      }
    }
  );
};

module.exports = {
  getBookingHistory,
  cancelFlightBooking,
  updateFlightBooking,
};
