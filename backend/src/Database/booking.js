const SQL_BOOKING = {
  GET_BOOKING_HISTORY:
    "select booking_id, DATE_FORMAT(sysdate(),'%Y-%m-%d') as curr_date, DATE_FORMAT(booking_date,'%Y-%m-%d') as booking_date,DATE_FORMAT(Flight.flight_date,'%Y-%m-%d') as dep_date,DATE_FORMAT(Flight.arr_date,'%Y-%m-%d') as arr_date,airport_code_src as src,airport_code_dst as dst,Booking.price,Booking.milesused,status \
    from Booking,Flight \
    where Booking.flight_id=Flight.flight_id;",
  //  and customer_id=? order by booking_id;",
  CANCEL_BOOKING:
    "Update Airlines.Booking set status='Canceled' where booking_id=?;",
  CANCEL_BOOKING_MILES:
    "Update Airlines.Customer set total_miles=(total_miles+?) where customer_id=1;",
  GET_BOOKING_FOR_UPDATE:
    "select class, traveller_cnt, booking_id,DATE_FORMAT(booking_date,'%Y-%m-%d') as booking_date,DATE_FORMAT(flight_date,'%Y-%m-%d') as dep_date,DATE_FORMAT(arr_date,'%Y-%m-%d') as arr_date,airport_code_src as src,airport_code_dst as dst,Booking.price,Booking.milesused,status \
    from Booking,Flight \
    where Booking.flight_id=Flight.flight_id and booking_id=?;",
  UPDATE_BOOKING:
    // "Update Airlines.Booking set src=?,dst=?,dep_date=? where booking_id=? and customer_id=?;",
    "Update Airlines.Booking set src=?,dst=? where booking_id=? and customer_id=?;",
  CHANGE_MILES_AFTER_BOOKING_UPDATE:
    "Update Airlines.Customer set total_miles=? where customer_id=?",
  CHANGE_MILES_AFTER_BOOKING:
    "Update Airlines.Customer set total_miles=(total_miles-?) where customer_id=?;",
  GET_USER_PROFILE: "Select * from Customer where customer_id=?;",
  UPDATE_PASSPORT: "Update Customer set passportid=? where customer_id=?",
  CREATE_BOOKING:
    "insert into Booking (status, book_with, booking_date, flight_id, customer_id, traveller_cnt, price, milesused, class ) values (?,?,?,?,?,?,?,?,?)",
  INSERT_TRAVELLERS:
    "insert into Traveller (flight_id, first,middle,last,nationality,booking_id, gender, age, seatId) values ?",
  GET_TRAVELLERS: "select * from  Traveller where booking_id = ?",
};

module.exports = SQL_BOOKING;
