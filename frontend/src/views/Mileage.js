import React, { useState } from 'react';
import { BsGift } from 'react-icons/bs';

function Mileage() {
  const defaultdata = {
    name: 'John',
    Mileageno: 'KCD31372',
    Miles: 2500,
  };
  const [mileageDetails, setmileageDetails] = useState({});

  return (
    <div className="shoe-container mx-auto">
      <div>
        <h1 style={{ marginLeft: '250px', marginBottom: '20px', marginTop: '80px' }}>
          Hi, {defaultdata.name}
        </h1>
        <h2 style={{ marginLeft: '250px' }}>Mileage Plus Number: {defaultdata.Mileageno}</h2>
      </div>
      <div className="Mileage-form-box" style={{ marginTop: '50px' }}>
        <h3 style={{ alignContent: 'center' }}>Rewards Earned</h3>
        <div className="circle" style={{ marginLeft: '170px' }}>
          <BsGift
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
              verticalAlign: 'middle',
            }}
          />
        </div>
        <br />
        <h5>Available miles: {defaultdata.Miles} </h5>
        <p>Expires: Never </p>
        <p>
          Use your <b>{defaultdata.Miles}</b> miles for the things that matter most
        </p>
      </div>
    </div>
  );
}
export default Mileage;
