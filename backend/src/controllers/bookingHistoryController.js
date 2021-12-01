const conn = require("../utils/dbConnector");
const SQL_BOOKING = require("../Database/booking");
const { query } = require("express");
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

const getTravellers = (req, res) => {
  conn.query(
    SQL_BOOKING.GET_TRAVELLERS,
    [req.query.booking_id],
    (error, result) => {
      if (error) {
        res.status(404).send({ err: error.code });
        return;
      } else {
        res.send(result);
      }
    }
  );
};

const cancelFlightBooking = (req, res) => {
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

const getUserProfile = (req, res) => {
  if (req.session.user) {
    const customer_id = req.session.user.customer_id;
    // console.log(req.session.user.customer_id);
    conn.query(SQL_BOOKING.GET_USER_PROFILE, [customer_id], (error, result) => {
      if (error) {
        res.status(404).send({ err: error.code });
      } else {
        res.send(result);
      }
    });
  } else {
    res.send("User is not logged in");
  }
};

const updatePassport = (req, res) => {
  const customer_id = req.session.user.customer_id;
  // console.log(req.body);
  conn.query(
    SQL_BOOKING.UPDATE_PASSPORT,
    [req.body.passportid, customer_id],
    (error, result) => {
      if (error) {
        res.status(404).send({ err: error.code });
      } else if (result.length == 0) {
        res.send([]);
      } else {
        // console.log(query);
        res.send(result);
      }
    }
  );
};

const createBooking = (req, res) => {
  console.log("Entered create booking", req.body);
  console.log(req.session.user);
  const body = req.body;
  const data = {
    status: "Booked",
    book_with: body.book_with,
    booking_date: new Date(),
    flight_id: body.flight_id,
    customer_id: req.session.user.customer_id,
    traveller_cnt: body.travellers,
    price: body.finalmoney,
    milesused: body.finalmiles,
    class: 0,
  };
  conn.query(SQL_BOOKING.CREATE_BOOKING, Object.values(data), (err, result) => {
    if (err) {
      res.status(404).send({ err: error.code });
      return;
    } else {
      // const booking_id = result.insertId;
      let travellerInfo = body.travelerInfo;
      travellerInfo = travellerInfo.map((each, index) => {
        let traveller = [];
        traveller.push(body.flight_id);
        traveller.push(each.firstName);
        traveller.push(each.middleName);
        traveller.push(each.lastName);
        traveller.push(each.nationality);
        traveller.push(result.insertId);
        traveller.push(each.gender);
        traveller.push(each.age);
        traveller.push(body.seats[index]);
        // traveller.booking_id = result.insertId;
        // traveller.gender = each.gender;
        // traveller.age = each.age;
        // traveller.seatId = body.seats[index];
        return traveller;
      });
      conn.query(
        SQL_BOOKING.INSERT_TRAVELLERS,
        [travellerInfo],
        (err1, res1) => {
          if (err1) {
            res.status(404).send({ err: err1.code });
            return;
          } else {
            conn.query(
              SQL_BOOKING.CHANGE_MILES_AFTER_BOOKING,
              [body.finalmiles, req.session.user.customer_id],
              (err, results) => {
                if (err) {
                  res.status(404).send({ err: err.code });
                  return;
                } else {
                  res.send();
                }
              }
            );
          }
        }
      );
    }
  });
  console.log(req.body);
  // res.send();
};

module.exports = {
  getBookingHistory,
  cancelFlightBooking,
  updateFlightBooking,
  getUserProfile,
  updatePassport,
  createBooking,
  getTravellers,
};
