import axios from "axios";
import { useEffect, useState } from "react";
import { get } from "../utils/serverCall";

const useLoginValidate = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    get(`/getLogin`).then((response) => {
      if (response.loggedIn === true) {
        const { email, customer } = response.user;

        setUserData((prevState) => ({
          ...prevState,
          email_id: response.user.email_id,
          customer_id: response.user.customer_id,
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
