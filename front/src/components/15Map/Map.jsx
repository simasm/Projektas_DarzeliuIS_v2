import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { OpenStreetMapProvider } from "leaflet-geosearch";

import L from "leaflet";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function Map({ kindergartens }) {
  const provider = new OpenStreetMapProvider();

  return (
    <div>
      <MapContainer
        center={[54.683289, 25.275109]}
        zoom={13}
        style={{ height: "85vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {kindergartens.map((k) => (
          <Marker
            key={k.id}
            position={[
              k.coordinates.split(",")[0],
              k.coordinates.split(",")[1],
            ]}
          />
        ))}
      </MapContainer>
    </div>
  );
}
