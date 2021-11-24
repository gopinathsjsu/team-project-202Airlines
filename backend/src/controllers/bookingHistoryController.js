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
        res.send(result);
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

const createBooking = (req, res) => {
  const body = req.body;
  const data = {
    status: "Booked",
    booking_date: Date.now(),
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
  createBooking,
};
