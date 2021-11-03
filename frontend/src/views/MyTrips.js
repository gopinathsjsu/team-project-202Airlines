import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../css/App.css";
import "../css/myTrip.css";
import backendServer from "../webConfig";

function MyTrip() {
  const [toggleState, setToggleState] = useState(1);
  const [bookingHistory, setBookingHistory] = useState([]);
  
  const toggleTab = (index) => {
      setToggleState(index);
    };

    useEffect(() => {
      Axios.get(`${backendServer}/getBookingHistory`)
      .then((response) => {
        setBookingHistory(response.data);
      });
    }, []);

  const Cancelbooking = () =>{
      Axios.post(`${backendServer}/cancelFlightBooking`,{
        booking_id: bookingHistory.booking_id
      })
      .then((result)=>{
        console.log("resuklt");
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
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Date</th>
                  <th scope="col">Source</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Status</th>
                </tr>
            <div>
              {bookingHistory.filter((a) => {
                  return (new Date(a.arr_date) - new Date >0) && !((a.status.toLowerCase() === "cancelled")||(a.status.toLowerCase() === "canceled"))
                }).map((data, index) => {
                return (
                  <tbody>
                  <tr>
                    <th scope="row">{data.booking_id}</th>
                    <td>{data.arr_date}</td>
                    <td>{data.src}</td>
                    <td>{data.dst}</td>
                    <td>{data.status}</td>
                    <button onClick={() => {
                    Cancelbooking();
                  }}>Cancel Booking</button>
                  </tr>
                  </tbody>
                  );
                })
                }
            </div>
            </table>
          </div>
          <div
            className={toggleState === 2 ? "content  active-content" : "content"}
          >
            <table id="booking">
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Date</th>
                  <th scope="col">Source</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Status</th>
                </tr>
            <div>
            {bookingHistory.filter((a) => {
              return (new Date(a.arr_date) - new Date <0)
            }).map((data, index) => {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{data.booking_id}</th>
                    <td>{data.arr_date}</td>
                    <td>{data.src}</td>
                    <td>{data.dst}</td>
                    <td>{data.status}</td>
                  </tr>
                  </tbody>
              );
            })
            }
            </div>
            </table>
          </div>
          <div
            className={toggleState === 3 ? "content  active-content" : "content"}
          >
            <table id="booking">
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Date</th>
                  <th scope="col">Source</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Status</th>
                </tr>
            <div>
            {bookingHistory.filter((a) => {
                return ((a.status.toLowerCase() === "cancelled") || (a.status.toLowerCase() === "canceled"))
             }).map((data, index) => {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{data.booking_id}</th>
                    <td>{data.arr_date}</td>
                    <td>{data.src}</td>
                    <td>{data.dst}</td>
                    <td>{data.status}</td>
                  </tr>
                  </tbody>
              );
            })
            }
            </div>
            </table>
          </div>
        </div>
      </div>
    );

}

export default MyTrip;
