const conn = require("../utils/dbConnector");

//Get all bookking details

const getBookingHistory = (req, res) => {
    // if (!req.session.user) {
    //   res.status(404).send({ err: "Invalid user session" });
    //   return;
    // }
    conn.query("select booking_id, DATE_FORMAT(arr_date,'%Y-%m-%d') as 'arr_date',src,dst,status from Booking;",
    //  where customer_id=? order by booking_id;",
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
    });
  };
  
  const cancelFlightBooking = (req, res) => {
    // if (!req.session.user) {
    //   res.status(404).send({ err: "Invalid user session" });
    //   return;
    // }
    conn.query(
        "Update Airlines.Booking set status='Canceled' where booking_id=?;",
      [req.body.booking_id],
      (error, result) => {
        if (error) {
          res.status(404).send({ err: error.code });
          return;
        } else if (result.length == 0) {
          res.send([]);
        } else {
          console.log("update");
          res.send(result);
        }
      }
    );
  };

module.exports = { getBookingHistory,cancelFlightBooking };