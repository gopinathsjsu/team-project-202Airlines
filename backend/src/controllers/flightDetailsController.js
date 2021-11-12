
const db = require("../utils/dbConnector");
const SQL_FLIGHT = require("../Database/flight");

const getFlightList = (req, res) => {
    const {
        book_with,
        flying_from,
        flying_to,
        flight_date,
        travellers,
        flight_class
    } = req.body;
   
    db.query(SQL_FLIGHT.GET_FLIGHT_LIST,[flight_date, flying_from, flying_to, travellers], (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        for(let i=0; i<results.length; i++){
            results[i].miles = results[i].miles * travellers;
            results[i].price = results[i].price * travellers;
        }
        res.send(results);
    });
}

module.exports = { 
    getFlightList
};



