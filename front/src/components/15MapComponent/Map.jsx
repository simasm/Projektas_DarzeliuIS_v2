import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "../../App.css"; 

import L, { Icon } from "leaflet";
import Markers from "./Markers";

export default function Map({
  kindergartens,
  activeKindergarten,
  setActive,
  setInactive,
  setActiveThroughMarker,
}) {
  return (
    <div>
      <MapContainer
        center={[54.683289, 25.275109]}
        zoom={13}
        className={"map-css"}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Markers
          kindergartens={kindergartens}
          activeKindergarten={activeKindergarten}
          setActiveThroughMarker={setActiveThroughMarker}
          setInactive={setInactive}
          setActive={setActive}
        />
      </MapContainer>
    </div>
  );
}
