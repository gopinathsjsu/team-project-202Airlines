const SQL_BOOKING = {
  GET_BOOKING_HISTORY:
    "select booking_id, DATE_FORMAT(booking_date,'%Y-%m-%d') as booking_date,DATE_FORMAT(dep_date,'%Y-%m-%d') as dep_date,DATE_FORMAT(arr_date,'%Y-%m-%d') as arr_date,airport_code_src as src,airport_code_dst as dst,Booking.price,status \
    from Booking,Flight \
    where Booking.flight_id=Flight.flight_id;",
  //  and customer_id=? order by booking_id;",
  CANCEL_BOOKING:
    "Update Airlines.Booking set status='Canceled' \
    where booking_id=?;",
  GET_BOOKING_FOR_UPDATE:
    "select booking_id, DATE_FORMAT(booking_date,'%Y-%m-%d') as booking_date,DATE_FORMAT(dep_date,'%Y-%m-%d') as dep_date,DATE_FORMAT(arr_date,'%Y-%m-%d') as arr_date,airport_code_src as src,airport_code_dst as dst,Booking.price,status \
    from Booking,Flight \
    where Booking.flight_id=Flight.flight_id and booking_id=?;",
  UPDATE_BOOKING:
    "Update Airlines.Booking set src=?,dst=?,dep_date=? where booking_id=? and customer_id=?",
  CHANGE_MILES_AFTER_BOOKING_UPDATE:
    "Update Airlines.Customer set total_miles=? where customer_id=?",
  CREATE_BOOKING:
    "insert into Booking (status, booking_date, flight_id, customer_id, traveller_cnt, price, milesused, class ) values (?,?,?,?,?,?,?,?)",
  INSERT_TRAVELLERS:
    "insert into Traveller (name,booking_id, gender, age, seatId) values ?",
};

module.exports = SQL_BOOKING;
