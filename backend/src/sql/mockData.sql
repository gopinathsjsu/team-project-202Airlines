select * from Airport;
-- insert into Airport values(1,'San Jose International Airport', 'San Jose', 'USA');
-- insert into Airport values(2, 'Indira Gandhi International Airport', 'New Delhi', 'India');
-- insert into Airport values(3, 'San Francisco International Airport', 'San Francisco', 'USA');

insert into Airport values(1,'SJC','San Jose International Airport', 'San Jose', 'USA');
insert into Airport values(2,'DEL', 'Indira Gandhi International Airport', 'New Delhi', 'India');
insert into Airport values(3,'SFO','San Francisco International Airport', 'San Francisco', 'USA');

select * from Flight;
-- insert into Flight values(100,2,'5I100','San Jose International Airport', 'Indira Gandhi International Airport', 'International','12:00','23:00',95,9500);
-- insert into Flight values(200,3, '5D200','San Jose International Airport', 'San Francisco International Airport', 'Domestic','9:00','11:00',40,4000);

insert into Flight values(100,'5I100','SJC', 'DEL', 'International','12:00','23:00',95,9500);
insert into Flight values(200, '5D200','SJC', 'SFO', 'Domestic','9:00','11:00',40,4000);


select * from Customer;
insert into Customer values(1,'Himakshi', 'Vijayvargiya','Fargo Drive','Cupertino','California','92031','32WR34242','Female','password','himakshi@gmail.com','User','Favourite Sport','Tennis','1T324',300,'USA');
insert into Customer values(2,'Isha', 'Rao','Calvert Drive','San Jose','California','93472','83REWE342','Female','password','isha@gmail.com','User','Favourite Sport','Tennis','2T342',500,'USA');
insert into Customer values(3,'Jahnavi', 'Marthala','Sunny Drive','Fremont','California','96473','7723EFSWF','Female','password','jahnavi@gmail.com','User','Favourite Sport','Tennis','5T244',600,'USA');
insert into Customer values(4,'Anil', 'Gubbala','Fargo Drive','Miltpitas','California','93467','80EFv342','Male','password','anil@gmail.com','User','Favourite Sport','Tennis','8T242',400,'USA');

select * from Booking;
-- insert into Booking values(1,'Booked','San Jose International Airport', 'Indira Gandhi International Airport','2021-10-10', '2021-11-10','2021-11-11',100,1,1,95,0);
-- insert into Booking values(2,'Booked','San Jose International Airport', 'San Francisco International Airport','2021-10-10', '2021-10-20','2021-10-20',200,3,1,40,0);
-- insert into Booking values(3,'Canceled','San Jose International Airport', 'Indira Gandhi International Airport','2021-10-10', '2021-10-30','2021-10-31',100,1,1,95,0);
-- insert into Booking values(4,'Canceled','San Jose International Airport', 'San Francisco International Airport','2021-10-10', '2021-11-20','2021-11-20',200,3,1,40,0);
-- insert into Booking values(5,'Booked','San Jose International Airport', 'Indira Gandhi International Airport','2021-10-10', '2021-10-29','2021-10-30',100,1,1,95,0);
-- insert into Booking values(6,'Booked','San Jose International Airport', 'San Francisco International Airport','2021-10-10', '2021-10-30','2021-10-30',200,3,1,40,0);

insert into Booking values(1,'Booked', '2021-10-10','2021-11-10','2021-11-11',100,1,1,95,0);
insert into Booking values(2,'Booked','2021-10-10', '2021-10-20','2021-10-20',200,3,1,40,0);
insert into Booking values(4,'Canceled','2021-10-10', '2021-11-20','2021-11-20',200,3,1,40,0);
insert into Booking values(5,'Booked','2021-10-10', '2021-10-29','2021-10-30',100,1,1,95,0);
insert into Booking values(6,'Booked','2021-10-10', '2021-10-30','2021-10-30',200,3,1,40,0);


select * from FlightSeat;
insert into FlightSeat values(100,'1D',1,1,'Himakshi','2021-10-10');
insert into FlightSeat values(200,'4D',3,2,'Jahnavi','2021-10-20');

select * from Seat;
insert into Seat values('1A','Business',20);
insert into Seat values('1B','Business',20);
insert into Seat values('1C','Business',20);
insert into Seat values('1D','Business',20);
insert into Seat values('2A','Economy',9);
insert into Seat values('2B','Economy',9);
insert into Seat values('2C','Economy',9);
insert into Seat values('2D','Economy',9);
insert into Seat values('3A','Economy',9);
insert into Seat values('3B','Economy',9);
insert into Seat values('3C','Economy',9);
insert into Seat values('3D','Economy',9);
insert into Seat values('4A','Economy',15);
insert into Seat values('4B','Economy',9);
insert into Seat values('4C','Economy',9);
insert into Seat values('4D','Economy',15);
insert into Seat values('5A','Economy',9);
insert into Seat values('5B','Economy',9);
insert into Seat values('5C','Economy',9);
insert into Seat values('5D','Economy',9);
insert into Seat values('6A','Economy',9);
insert into Seat values('6B','Economy',9);
insert into Seat values('6C','Economy',9);
insert into Seat values('6D','Economy',9);