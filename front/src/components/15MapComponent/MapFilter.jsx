import React, { useEffect, useState } from "react";
import "../../App.css";
import { useHistory } from "react-router-dom";
import apiEndpoint from "../10Services/endpoint";
import http from "../10Services/httpService";

export default function MapFilter() {

    const [allKindergartens, setAllKidergartens] = useState([]);

    useEffect(() => {
        async function getAllKindergartens() {
            await http
            .get(`${apiEndpoint}/api/darzeliai/visi`)
            .then((response) => setAllKidergartens(response.data));
        }

        getAllKindergartens();
    }, []);
    

    return(
        <div className="container all-kindergarten-map">
            {allKindergartens.map((kinderis) => (
                <div key={kinderis.id} className="mt-1">{kinderis.name}</div>
            ))}
        </div>
    )
}