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
  conn.query(SQL_ADMIN.ADD_FLIGHTS, (error, result) => {
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

const editFlights = (req, res) => {
  // if (!req.session.user) {
  //   res.status(404).send({ err: "Invalid user session" });
  //   return;
  // }
  conn.query(SQL_ADMIN.EDIT_FLIGHT_DETAILS, (error, result) => {
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

module.exports = {
  getProfile,
  getFlights,
  getFlightsById,
  addFlights,
  editFlights,
};
