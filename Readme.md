# Steps to start server:

Frontend:

- cd frontend
- npm install
- npm start

Backend:

- cd backend
- npm install
- node index.js

# Webpage flow
unregistered user:  
    Home page 
    Sign in  
    >Sign up 
    Search Flights 

Registerd user: 
    Search Flight
        select miles or money
        select business/economy
        select oneway or roundtrip
        origin & destination
        start & end date
        No of travellers
    Select flight
    Book Flight
        Show flight info
        Ask traveller info
        Select seat
            Each seat has price based on location
        Payment/Mielage points
        Confirm booking
    My Bookings
        History
        View Booking
        Filter based on status - optional
        Update Booking 
            Cancel
            change travel date
            change seat
    My Profile
        update user details
    Manage Mielage
        View Mielage points 
        History of Mielage points earned / travel history

Additional Functions:
    Book without login , Fetch ticket without login
