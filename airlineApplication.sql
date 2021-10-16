drop database  if exists airline;
create database airline;
use airline;

create table airport (
    airport_id int auto_increment,
    airport_name varchar(50), 
    airport_location varchar(50), 
    primary key(airport_id)
);

create table flight (
    flight_id int auto_increment,
    airport_id int not null,
    flight_number int unique, 
    flight_from varchar(50), 
    flight_destination varchar(50),
    flight_type, 
    from_date date, 
    to_date date,
    start_time time,
    end_time time, 
    price int,
    primary key(flight_id),
    foreign key (airport_id) references airport (airport_id) on update cascade on delete cascade
);

create table customer (
    customer_id int auto_increment,
    customer_first_name varchar(50), 
    customer_last_name varchar(50),  
    passport_id varchar(50), 
    address_street varchar(50), 
    city varchar(50),  
    state varchar(50),  
    zip_code int, 
    primary key(customer_id)
);

create table flight_booking (
    booking_id int auto_increment,
    booking_status varchar(50),
    booking_date date, 
    flight_id int, 
    customer_id int ,
    primary key(booking_id),
    foreign key (flight_id) references flight (flight_id) on update cascade on delete cascade,
    foreign key (customer_id) references customer (customer_id) on update cascade on delete cascade
);

create table seat (
    seat_no varchar(50), 
    flight_id int,
    seat_status varchar(50),
    class varchar(50), 
    price int,
    primary key(seat_no),
    foreign key (flight_id) references flight (flight_id) on update cascade on delete cascade
);	