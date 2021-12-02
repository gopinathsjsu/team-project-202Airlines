import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsGift } from 'react-icons/bs';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { RiShareBoxLine } from 'react-icons/ri';
import { integerPropType } from '@mui/utils';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  Typography,
  Input,
  FormHelperText,
  Select,
  MenuItem,
} from '@mui/material';
import { REDUCER } from '../utils/consts';
import useLoginValidate from '../components/Validate';
import redirectLogin from '../components/RedirectLogin';
import backendServer from '../webConfig';
import '../css/App.css';

function Mileage() {
  const history = useHistory();
  const isSignedIn = JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const milesValues = [
    '10000 miles: ($1000.00)',
    '20000 miles: ($2000.00)',
    '30000 miles: ($3000.00)',
    '40000 miles: ($4000.00)',
    '50000 miles: ($5000.00)',
    '60000 miles: ($6000.00)',
  ];
  const [miles, setMiles] = useState('2000 miles: ($70.00)');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, userData } = useLoginValidate();
  const [mileageDetails, setmileageDetails] = useState({ name: '', Mileageno: '', Miles: '' });
  // if (!userData.customer_id) {
  //   return redirectLogin();
  // }
  useEffect(async () => {
    console.log(userData.customer_id);
    await axios.get(`${backendServer}/mileage`).then((res) => {
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
  const addMiles = () => {
    const myArray = miles.split(' ');
    const data = {
      curr_miles: mileageDetails.Miles,
      miles: myArray[0],
    };
    axios
      .post(`${backendServer}/addMiles`, data)
      .then((res) => {
        console.log(res);
        setmileageDetails((prevState) => ({
          ...prevState,
          name: res.data[0].customer_first_name,
          Mileageno: res.data[0].mileage_plus_number,
          Miles: res.data[0].total_miles,
        }));
      })
      .catch((error) => {});
    alert('Miles added successfully');
    handleClose();
  };

  const returnToSignIn = () => {
    history.push('/signin');
  };

  if (!isSignedIn) {
    returnToSignIn();
  }

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
        <div>
          {Miles === null ? <h5>Available miles: 0 </h5> : <h5>Available miles: {Miles} </h5>}
        </div>
        <p>
          Miles never expire <AiFillQuestionCircle style={{ color: '#0d9cdf', fontSize: '20' }} />
        </p>
        {/* <p>
          Use your <b>{Miles}</b> miles for the things that matter most
        </p> */}
        <Button
          style={{ cursor: 'pointer', color: '#006080', textDecoration: 'underline' }}
          onClick={handleOpen}
        >
          Buy miles <RiShareBoxLine />
        </Button>
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add miles
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Select Miles</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={miles}
                label="Country"
                onChange={(e) => {
                  console.log(e.target.value);
                  // setUserUpdated({
                  //   ...userUpdated,
                  //   details: {
                  //     ...userUpdated.details,
                  //     country: e.target.value,
                  //   },
                  // });
                  setMiles(e.target.value);
                }}
              >
                {milesValues.map((val) => (
                  <MenuItem value={val}>{val}</MenuItem>
                ))}
              </Select>
            </Typography>
            <Button
              style={{ color: '#ffff', backgroundColor: '#0d9cdf', margin: '5px' }}
              type="submit"
              onClick={addMiles}
            >
              <h6>Add</h6>
            </Button>
            <Button
              style={{ color: '#ffff', backgroundColor: '#0d9cdf', margin: '5px' }}
              type="submit"
              onClick={handleClose}
            >
              <h6>Close</h6>
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
export default Mileage;
