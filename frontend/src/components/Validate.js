import axios from 'axios';
import { useEffect, useState } from 'react';
import backendServer from '../webConfig';

const useLoginValidate = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${backendServer}/getLogin`).then((response) => {
      if (response.data.loggedIn === true) {
        const { email, customer } = response.data.user;

        setUserData((prevState) => ({
          ...prevState,
          email_id: response.data.user.email_id,
          customer_id: response.data.user.customer_id,
        }));
      } else {
        setUserData({});
      }
      setLoading(false);
    });
  }, []);
  console.log(userData);

  return { loading, userData };
};

export default useLoginValidate;
