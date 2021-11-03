import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../css/App.css";
import "../css/myTrip.css";
import backendServer from "../webConfig";

function MyTrip() {
  const [toggleState, setToggleState] = useState(1);
  const [bookingHistory, setBookingHistory] = useState([]);
  // const [cancelMode, setCancelMode] = useState(false);

  const toggleTab = (index) => {
      setToggleState(index);
    };

    useEffect(() => {
      Axios.get(`${backendServer}/getBookingHistory`)
      .then((response) => {
        setBookingHistory(response.data);
      });
    }, []);
    console.log(bookingHistory);

  const cancelBooking = (id) =>{
    console.log("id",id);
      Axios.post(`${backendServer}/cancelFlightBooking`,{
        booking_id: id 
      })
      .then((result)=>{
        console.log(result);
       window.location.reload();
    })
    .catch((error) => {
    });
  }
  

    return (
      <div className="container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Upcoming
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Past 
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Canceled
          </button>
        </div>
  

        


        <div className="content-tabs">
          <div
            className={toggleState === 1 ? "content  active-content" : "content"}
          >
            <table id="booking">
              <tbody>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Departure Date</th>
                  <th scope="col">Source</th>
                  <th scope="col">Arrival Date</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              {bookingHistory.filter((a) => {
                  return (new Date(a.dep_date) - new Date >0) && !((a.status.toLowerCase() === "cancelled")||(a.status.toLowerCase() === "canceled"))
                }).map((data, index) => {
                return (              
                  <tr key={data.booking_id}>
                    <th scope="row">{data.booking_id}</th>
                    <td>{data.booking_date}</td>
                    <td>{data.dep_date}</td>
                    <td>{data.src}</td>
                    <td>{data.arr_date}</td>
                    <td>{data.dst}</td>
                    <td>${data.price}</td>
                    <td>{data.status}</td>
                    <td><button onClick={() => {
                    window.location="/updateBooking";
                  }}>Update Booking</button>
                    <button onClick={() => {
                    cancelBooking(data.booking_id);
                  }}>Cancel Booking</button>
                  </td>
                  </tr>
                  );
                })
                }
                </tbody>
            </table>
          </div>
          <div
            className={toggleState === 2 ? "content  active-content" : "content"}
          >
            <table id="booking">
                <tr>
                <th scope="col">S.No.</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Departure Date</th>
                  <th scope="col">Source</th>
                  <th scope="col">Arrival Date</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
            {bookingHistory.filter((a) => {
              return (new Date(a.dep_date) - new Date <0)
            }).map((data, index) => {
              return (
                  <tr  key={data.booking_id}>
                    <th scope="row">{data.booking_id}</th>
                    <td>{data.booking_date}</td>
                    <td>{data.dep_date}</td>
                    <td>{data.src}</td>
                    <td>{data.arr_date}</td>
                    <td>{data.dst}</td>
                    <td>${data.price}</td>
                    <td>{data.status}</td>
                  </tr>
              );
            })
            }
            </table>
          </div>
          <div
            className={toggleState === 3 ? "content  active-content" : "content"}
          >
            <table id="booking">
                <tr>
                <th scope="col">S.No.</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Departure Date</th>
                  <th scope="col">Source</th>
                  <th scope="col">Arrival Date</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
            {bookingHistory.filter((a) => {
                return ((a.status.toLowerCase() === "cancelled") || (a.status.toLowerCase() === "canceled"))
             }).map((data, index) => {
              return (
                  <tr  key={data.booking_id}>
                    <th scope="row">{data.booking_id}</th>
                    <td>{data.booking_date}</td>
                    <td>{data.dep_date}</td>
                    <td>{data.src}</td>
                    <td>{data.arr_date}</td>
                    <td>{data.dst}</td>
                    <td>${data.price}</td>
                    <td>{data.status}</td>
                  </tr>
              );
            })
            }
            </table>
          </div>
        </div>
      </div>
    );

}

export default MyTrip;
