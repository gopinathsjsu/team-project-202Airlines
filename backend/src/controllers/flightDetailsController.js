const db = require("../utils/dbConnector");
const SQL_FLIGHT = require("../Database/flight");

const getFlightList = (req, res) => {
  const {
    book_with,
    flying_from,
    flying_to,
    flight_date,
    travellers,
    flight_class,
  } = req.body;

  db.query(
    SQL_FLIGHT.GET_FLIGHT_LIST,
    [flight_date, flying_from, flying_to, travellers],
    (error, results, fields) => {
      if (error) {
        res.status(500);
        return console.error(error.message);
      }
      for (let i = 0; i < results.length; i++) {
        results[i].miles = results[i].miles * travellers;
        results[i].price = results[i].price * travellers;
      }
      res.send(results);
    }
  );
};

const getSeatInfo = (req, res) => {
  const { flight_id } = req.query;
  db.query(SQL_FLIGHT.GET_SEAT_INFO, [flight_id], (error, results) => {
    if (error) {
      res.status(500);
    } else {
      db.query(SQL_FLIGHT.GET_BOOKED_SEATS, [flight_id], (err1, res1) => {
        if (err1) {
          res.send(500);
        } else {
          res.send({ seatInfo: results, bookedSeats: res1 });
        }
      });
    }
  });
};

module.exports = {
  getFlightList,
  getSeatInfo,
};
