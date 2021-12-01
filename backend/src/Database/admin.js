const SQL_ADMIN = {
  ADMIN_PROFILE:
    "Select * from Airlines.Customer where role='EMPLOYER' and customer_id=?;",
  MILEAGE:
    "Select mileage_plus_number, customer_first_name, total_miles from Airlines.Customer where customer_id=?;",
  GET_FLIGHTS: "SELECT * from Airlines.Flight;",
  // GET_FLIGHTS_BY_ID: "SELECT * from Airlines.Flight where flight_id=?;",
  GET_FLIGHTS_BY_ID:
    "select flight_id,flight_number,airport_code_src,airport_code_dst,flight_type,start_time,end_time,price,miles,DATE_FORMAT(flight_date, '%Y-%m-%d') as flight_date,no_of_seats,airplaneId,seatPriceId,DATE_FORMAT(arr_date, '%Y-%m-%d') as arr_date \
    from  Airlines.Flight where flight_id=?;",
  ADD_FLIGHTS:
    "Insert into Airlines.Flight (flight_number,airport_code_src,airport_code_dst,flight_date,start_time,end_time,flight_type,no_of_seats,miles,price,arr_date) \
    values (?,?,?,?,?,?,?,?,?,?,?);",
  EDIT_FLIGHT_DETAILS:
    "Update Airlines.Flight set \
      airport_code_src =?,\
      airport_code_dst =?,\
      flight_date=?,\
      arr_date=?,\
      start_time=?,\
      end_time=?,\
      flight_type=?,\
      no_of_seats=?,\
      miles=?,\
      price=?\
      where flight_id=?;",
  GET_AIRPORT_CODE: "Select * from Airport;",
  ADD_MILES: "UPDATE Airlines.Customer SET total_miles=? where customer_id=?;",
};

module.exports = SQL_ADMIN;
