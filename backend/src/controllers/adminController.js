const conn = require("../utils/dbConnector");
const SQL_ADMIN = require("../Database/admin");

const getProfile = (req, res) => {
  // if (!req.session.user) {
  //   res.status(404).send({ err: "Invalid user session" });
  //   return;
  // }
  conn.query(SQL_ADMIN.ADMIN_PROFILE, (error, result) => {
    //  console.log(result);
    if (error) {
      res.status(404).send({ err: error.code });
    } else if (result.length == 0) {
      res.send([]);
    } else {
      res.send(result);
    }
  });
};

const getFlights = (req, res) => {
  // if (!req.session.user) {
  //   res.status(404).send({ err: "Invalid user session" });
  //   return;
  // }
  conn.query(SQL_ADMIN.GET_FLIGHTS, (error, result) => {
    //  console.log(result);
    if (error) {
      res.status(404).send({ err: error.code });
    } else if (result.length == 0) {
      res.send([]);
    } else {
      res.send(result);
    }
  });
};

const getFlightsById = (req, res) => {
  // if (!req.session.user) {
  //   res.status(404).send({ err: "Invalid user session" });
  //   return;
  // }
  const flight_id = req.params.flightId;
  conn.query(SQL_ADMIN.GET_FLIGHTS_BY_ID, [flight_id], (error, result) => {
    //  console.log(result);
    if (error) {
      res.status(404).send({ err: error.code });
    } else if (result.length == 0) {
      res.send([]);
    } else {
      res.send(result);
    }
  });
};

const addFlights = (req, res) => {
  // if (!req.session.user) {
  //   res.status(404).send({ err: "Invalid user session" });
  //   return;
  // }

  // console.log("body", req.body);
  conn.query(
    SQL_ADMIN.ADD_FLIGHTS,
    [
      req.body.flight_number,
      req.body.airport_code_src,
      req.body.airport_code_dst,
      req.body.flight_date,
      req.body.start_time,
      req.body.end_time,
      req.body.flight_type,
      req.body.no_of_seats,
      req.body.miles,
      req.body.price,
    ],
    (error, result) => {
      // console.log(result);
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

const editFlights = (req, res) => {
  // if (!req.session.user) {
  //   res.status(404).send({ err: "Invalid user session" });
  //   return;
  // }
  conn.query(
    SQL_ADMIN.EDIT_FLIGHT_DETAILS,
    [
      req.body.airport_code_src,
      req.body.airport_code_dst,
      req.body.flight_date,
      req.body.start_time,
      req.body.end_time,
      req.body.flight_type,
      req.body.no_of_seats,
      req.body.miles,
      req.body.price,
      req.body.flight_id,
    ],
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

const getAirportCode = (req, res) => {
  // if (!req.session.user) {
  //   res.status(404).send({ err: "Invalid user session" });
  //   return;
  // }
  conn.query(SQL_ADMIN.GET_AIRPORT_CODE, (error, result) => {
    // console.log(result);
    if (error) {
      res.status(404).send({ err: error.code });
    } else if (result.length == 0) {
      res.send([]);
    } else {
      res.send(result);
    }
  });
};

module.exports = {
  getProfile,
  getFlights,
  getFlightsById,
  addFlights,
  editFlights,
  getAirportCode,
};