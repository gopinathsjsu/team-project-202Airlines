drop database  if exists Airline;
create database Airline;
use Airline;

create table airport (
    airport_id int auto_increment,
    airport_name varchar(250), 
    airport_location varchar(250), 
    primary key(airport_id)
);

create table flight (
    flight_id int auto_increment,
    airport_id int not null,
    flight_number int unique, 
    flight_src varchar(250), 
    flight_dst varchar(250),
    flight_type varchar(250), 
    start_time time,
    end_time time, 
    price decimal(15,2),
    miles int,
    primary key(flight_id),
    foreign key (airport_id) references airport (airport_id) on update cascade on delete cascade
);

create table customer (
    customer_id int auto_increment,
    customer_first_name varchar(250), 
    customer_last_name varchar(250), 
    address varchar(250), 
    city varchar(250), 
    state varchar(250), 
    zip_code int, 
    passportid varchar(250), 
    gender varchar(250), 
    password varchar(250),  
    emailid varchar(250), 
    role varchar(250), 
    sec_ques varchar(250),
    sec_ans varchar(250),  
    mileage_plus_number varchar(250), 
    total_miles int, 
    primary key(customer_id)
);