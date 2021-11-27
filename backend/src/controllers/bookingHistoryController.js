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

const getPassport = (req, res) => {
  const customer_id = 1;
  conn.query(SQL_BOOKING.GET_PASSPORT, [customer_id], (error, result) => {
    if (error) {
      res.status(404).send({ err: error.code });
      return;
    } else {
      res.send(result);
    }
  });
};

const updatePassport = (req, res) => {
  const customer_id = 1;
  // console.log(req.body);
  conn.query(
    SQL_BOOKING.UPDATE_PASSPORT,
    [req.body.passportid, customer_id],
    (error, result) => {
      if (error) {
        res.status(404).send({ err: error.code });
        return;
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
  const body = req.body;
  const data = {
    status: "Booked",
    booking_date: new Date(),
    flight_id: body.flight_id,
    customer_id: req.session.user.customer_id,
    traveller_cnt: body.travellers,
    price: body.seatsPrice + body.price,
    milesused: 0,
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
            res.send();
          }
        }
      );
    }
  });
  console.log(req.body);
  res.send();
};

module.exports = {
  getBookingHistory,
  cancelFlightBooking,
  updateFlightBooking,
  getPassport,
  updatePassport,
  createBooking,
  getTravellers,
};
