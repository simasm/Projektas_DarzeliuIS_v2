import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import { MapContainer, TileLayer, Circle} from "react-leaflet";
import "../../App.css";
import AuthContext from "../11Context/AuthContext";
import MapControls from "./MapControls";

import Markers from "./Markers";

export default function Map({
  kindergartens,
  activeKindergarten,
  setActive,
  setInactive,
  setActiveThroughMarker,
  userCoordinates,
  userAddress,
}) {
  return (
    <div>
      <MapContainer
        center={[54.683289, 25.275109]}
        zoom={14}
        className={"map-css"}
      >
        <TileLayer className={"map-depth"}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        

        <Markers
          kindergartens={kindergartens}
          activeKindergarten={activeKindergarten}
          setActiveThroughMarker={setActiveThroughMarker}
          setInactive={setInactive}
          setActive={setActive}
          userCoordinates={userCoordinates}
          userAddress={userAddress}
        />

        <MapControls
          userCoordinates={userCoordinates}
          userAddress={userAddress}
        />
      </MapContainer>
    </div>
  );
}
