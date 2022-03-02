import React, { useEffect, useState } from "react";
import Map from "./Map";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import { OpenStreetMapProvider } from "leaflet-geosearch";

export default function MapViewContainer() {
  const [kindergartens, setKindergartens] = useState([]);
  let coords = [];

  kindergartens.map((k) => coords.push(k.coordinates));

  const provider = new OpenStreetMapProvider();

  useEffect(() => {
    async function getKindergartens() {
      await http
        .get(`${apiEndpoint}/api/darzeliai/visi`)
        .then((response) => setKindergartens(response.data));
    }

    getKindergartens();
  }, []);

  return (
    <div>
      <div className="container pt-4">
        <div className="row ">
          <div
            className="bg-light pb-3 col-12 col-sm-12 col-md-12 col-lg-3 pt-1"
            style={{
              overflow: "scroll",
              height: "400px",
              border: "2px groove grey",
            }}
          >
            {kindergartens.map((k) => (
              <div key={k.id}>{k.name}</div>
            ))}
          </div>

          <div className="col-lg-9">
            <Map kindergartens={kindergartens} coordinates={coords} />
          </div>
        </div>
      </div>
    </div>
  );
}
