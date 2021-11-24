const SQL_FLIGHT = {
  GET_FLIGHT_LIST:
    "SELECT flight_id, flight_number,airport_code_src,airport_code_dst,start_time,end_time,price,miles,DATE_FORMAT(flight_date,'%Y-%m-%d'),(end_time-start_time) as 'duration' FROM Airlines.Flight \
                      where flight_date=? and airport_code_src=? and airport_code_dst=?;",

  GET_SEAT_INFO:
    "Select Airplane.*, SeatPrice.* from Flight natural join Airplane natural join SeatPrice where flight_id = ?",

  GET_BOOKED_SEATS:
    "Select  seatId  from Booking natural join SeatBooking where flight_id=?",
};

module.exports = SQL_FLIGHT;
