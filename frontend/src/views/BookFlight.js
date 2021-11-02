import React from 'react';

function BookFlight() {


  return (
    <form className="flight-book-form">
        <div className="booking-form-box">
        <div className="radio-btn">
          <input type="radio" className="btn" name="check" checked="checked"/><span>Money</span>
          <input type="radio" className="btn" name="check"/><span>Miles</span>
        </div>
        <div className="booking-form">
          <label> Flying From </label>
            <input type="text" className="form-control" placeholder="Enter Airport Code"/>
            <label> Flying To </label>
            <input type="text" className="form-control" placeholder="Enter Airport Code"/>
            <div className="input-grp">
            <label> Departing </label>
            <input type="date" className="form-control select-date"/>
            </div>

            <div className="input-grp">
            <label> Travellers </label>
            <input type="number" className="form-control" min="1" step="1"/>
            </div>

            <div className="input-grp">
            <label> Class </label>
            <select class="custom-select">
              <option value="1">Economy</option>
              <option value="2">Business</option>
            </select>
            </div>

            <div className="input-grp">
            <button type="button" className="btn btn-primary flight">Show Flights</button>
            </div>

        </div>
        </div>
    </form>
   

  );
}

export default BookFlight;
