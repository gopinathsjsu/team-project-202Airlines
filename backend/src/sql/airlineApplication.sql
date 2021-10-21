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
CREATE TABLE IF NOT EXISTS `Airlines`.`Booking` (
  `booking_id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `src` VARCHAR(45) NULL DEFAULT NULL,
  `dst` VARCHAR(45) NULL DEFAULT NULL,
  `dep_date` DATETIME NULL DEFAULT NULL,
  `arr_date` DATETIME NULL DEFAULT NULL,
  `flight_id` INT NULL DEFAULT NULL,
  `customer_id` INT NULL DEFAULT NULL,
  `traveller_cnt` INT NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  `milesused` INT NULL DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  INDEX `flight_fk_idx` (`flight_id` ASC) VISIBLE,
  INDEX `cstmr_fk_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `cstmr_fk`
    FOREIGN KEY (`customer_id`)
    REFERENCES `Airlines`.`customer` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `flight_fk`
    FOREIGN KEY (`flight_id`)
    REFERENCES `Airlines`.`flight` (`flight_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
 
 CREATE TABLE IF NOT EXISTS `Airlines`.`FlightSeat` (
  `flight_id` INT NOT NULL,
  `seat_no` VARCHAR(3) NULL DEFAULT NULL,
  `customer_id` INT NOT NULL,
  `booking_id` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`flight_id`, `customer_id`, `booking_id`),
  INDEX `cus_fk_idx` (`customer_id` ASC) VISIBLE,
  INDEX `booking_fk_idx` (`booking_id` ASC) VISIBLE,
  CONSTRAINT `booking_id_fk`
    FOREIGN KEY (`booking_id`)
    REFERENCES `Airlines`.`Booking` (`booking_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `customer_id_fk`
    FOREIGN KEY (`customer_id`)
    REFERENCES `Airlines`.`customer` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `flight_id_fk`
    FOREIGN KEY (`flight_id`)
    REFERENCES `Airlines`.`flight` (`flight_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
  
  CREATE TABLE IF NOT EXISTS `Airlines`.`Seat` (
  `seat_no` VARCHAR(3) NOT NULL,
  `class` VARCHAR(45) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`seat_no`));
  CREATE TABLE IF NOT EXISTS `Airlines`.`Traveller` (
  `name` VARCHAR(45) NOT NULL,
  `booking_id` INT NOT NULL,
  `gender` CHAR(1) NULL DEFAULT NULL,
  `age` INT NULL DEFAULT NULL,
  PRIMARY KEY (`name`, `booking_id`),
  INDEX `booking_fk_idx` (`booking_id` ASC) VISIBLE,
  CONSTRAINT `booking_fk`
    FOREIGN KEY (`booking_id`)
    REFERENCES `Airlines`.`Booking` (`booking_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
