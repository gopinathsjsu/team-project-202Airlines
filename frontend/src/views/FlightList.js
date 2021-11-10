import React from 'react';
import Axios from "axios";
import { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import backendServer from "../webConfig";

let rows = [];
function FlightList() {
    Axios.defaults.withCredentials = true;
    const [loading, setLoading] = useState(true);

    let { details } = useParams();
    let flightSearchDetails = JSON.parse(decodeURIComponent(details));

    useEffect(() => {
        console.log(flightSearchDetails);
        Axios.post(`${backendServer}/flightList`, flightSearchDetails).then(function (res) {
            console.log(res);
            rows = res.data;
            setLoading(false);
        });
    }, []);
    if (loading) {
        return ("Loading data....");
    } else {
        return (
            <div className="container">
                {rows.map(res =>
                    <div className="row row-cols-6" key={res.flight_number}>
                        <div className="col">{res.flight_number}</div>
                        <div className="col">{res.airport_code_dst}</div>
                        <div className="col">{res.airport_code_src}</div>
                        <div className="col">{res.start_time}</div>
                        <div className="col">{res.end_time}</div>
                        <div className="col">${res.price}</div>
                    </div>
                )}
            </div>

        );
    }
}
export default FlightList;