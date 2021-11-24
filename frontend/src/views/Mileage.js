import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsGift } from 'react-icons/bs';
import useLoginValidate from '../components/Validate';
import redirectLogin from '../components/RedirectLogin';
import backendServer from '../webConfig';
import '../css/App.css';
// import '../css/Mileage.css';

function Mileage() {
  const { loading, userData } = useLoginValidate();
  userData.customer_id = 7;
  const [mileageDetails, setmileageDetails] = useState({ name: '', Mileageno: '', Miles: '' });
  // if (!userData.customer_id) {
  //   return redirectLogin();
  // }
  useEffect(async () => {
    console.log(userData.customer_id);
    await axios
      .get(`${backendServer}/mileage`, { params: { customer_id: userData.customer_id } })
      .then((res) => {
        console.log(res);
        setmileageDetails((prevState) => ({
          ...prevState,
          name: res.data[0].customer_first_name,
          Mileageno: res.data[0].mileage_plus_number,
          Miles: res.data[0].total_miles,
        }));
      });
  }, []);

  const { name, Mileageno, Miles } = mileageDetails;

  return (
    <div className="shoe-container mx-auto">
      <div>
        <h1 style={{ padding: '30px', margin: '20px' }}>Hi, {name}</h1>
        <h2 style={{ padding: '50px' }}>Mileage Plus Number: {Mileageno}</h2>
      </div>
      <div className="Mileage-form-box">
        <h3 style={{ alignContent: 'center' }}>Rewards Earned</h3>
        <div className="Mileage-circle">
          <div className="circle">
            <BsGift
              style={{
                flex: 1,
                margin: 5,
                justifyContent: 'center',
                alignItems: 'center',
                verticalAlign: 'middle',
              }}
            />
          </div>
        </div>
        <br />
        <h5>Available miles: {Miles} </h5>
        <p>Expires: Never </p>
        <p>
          Use your <b>{Miles}</b> miles for the things that matter most
        </p>
      </div>
    </div>
  );
}
export default Mileage;
