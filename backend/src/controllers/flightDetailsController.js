
const db = require("../utils/dbConnector");
const SQL_FLIGHT = require("../Database/flight");

const getFlightList = (req, res) => {
    let details=req.params.details;
    console.log("hello");
    db.query(SQL_FLIGHT.GET_FLIGHT_LIST, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        res.send(results);
    });
}

module.exports = { 
    getFlightList
};



