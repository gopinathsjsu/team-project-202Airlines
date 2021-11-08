import React from 'react';
import Axios from "axios";
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import backendServer from "../webConfig";

let rows = [];
function FlightList() {
    Axios.defaults.withCredentials = true;

    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        Axios.get(`${backendServer}/flightList/`+ "2").then(function (res) {
            console.log(res);
            rows = res.data;
            setLoading(false);
        });
    }, []);
    if (loading) {
        return ("Loading data....");
    } else {
        return (
            <table>
                <tbody>
                    {rows[0].name !== null && rows.map(res =>
                        <tr>
                          <td>#</td>
                          <td>{res.flight_number}</td>
                          <td>{res.airport_code_dst}</td>
                          <td>{res.airport_code_src}</td>                        
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}
export default FlightList;