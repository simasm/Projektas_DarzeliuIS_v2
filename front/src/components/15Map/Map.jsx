import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import L from "leaflet";
import Markers from "./Markers";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

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
        style={{ height: "85vh" }}
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
