drop database if exists Airlines;
create database Airlines;
use Airlines;

CREATE TABLE IF NOT EXISTS `Airlines`.`Airport` (
  `airport_id` int NOT NULL AUTO_INCREMENT,
  `airport_code` varchar(4) NOT NULL UNIQUE,
  `airport_name` varchar(100) DEFAULT NULL,
  `airport_location` varchar(100) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`airport_id`)
);


CREATE TABLE `Flight` (
  `flight_id` int NOT NULL AUTO_INCREMENT,
  `flight_number` varchar(50) DEFAULT NULL,
  `airport_code_src` varchar(100) DEFAULT NULL,
  `airport_code_dst` varchar(100) DEFAULT NULL,
  `flight_type` varchar(50) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `miles` int DEFAULT NULL,
  -- `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`flight_id`),
  UNIQUE KEY `flight_number` (`flight_number`),
  KEY `airport_code_src` (`airport_code_src`),
  KEY `airport_code_dst` (`airport_code_dst`),
  CONSTRAINT `Flight_ibfk_1` 
    FOREIGN KEY (`airport_code_src`) 
    REFERENCES `Airport` (`airport_code`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT `Flight_ibfk_2` 
    FOREIGN KEY (`airport_code_dst`) 
    REFERENCES `Airport` (`airport_code`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

alter table Flight auto_increment = 100;

CREATE TABLE IF NOT EXISTS `Airlines`.`Customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `customer_first_name` varchar(100) DEFAULT NULL,
  `customer_last_name` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip_code` int DEFAULT NULL,
  `passportid` varchar(100) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `emailid` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `sec_ques` varchar(250) DEFAULT NULL,
  `sec_ans` varchar(250) DEFAULT NULL,
  `mileage_plus_number` varchar(50) DEFAULT NULL,
  `total_miles` int DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
);

CREATE TABLE IF NOT EXISTS `Airlines`.`Booking` (
  `booking_id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  -- `src` VARCHAR(45) NULL DEFAULT NULL,
  -- `dst` VARCHAR(45) NULL DEFAULT NULL,
  `booking_date` DATETIME NULL DEFAULT NULL,
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
    REFERENCES `Airlines`.`Customer` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `flight_fk`
    FOREIGN KEY (`flight_id`)
    REFERENCES `Airlines`.`Flight` (`flight_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
 
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
    REFERENCES `Airlines`.`Customer` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `flight_id_fk`
    FOREIGN KEY (`flight_id`)
    REFERENCES `Airlines`.`Flight` (`flight_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
CONSTRAINT `seat_no_fk`
    FOREIGN KEY (`seat_no`)
    REFERENCES `Airlines`.`Seat` (`seat_no`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
  
CREATE TABLE IF NOT EXISTS `Airlines`.`Seat` (
  `seat_no` VARCHAR(3) NOT NULL,
  `class` VARCHAR(45) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`seat_no`)
);

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
    ON UPDATE CASCADE
);

