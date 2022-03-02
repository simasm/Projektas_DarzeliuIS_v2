import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";

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
}) {
  return (
    <div>
      {activeKindergarten === null ? <div>A</div> : <div>B</div>}
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
            eventHandlers={{
              click: () => setActive(k),
            }}
          ></Marker>
        ))}

        {activeKindergarten && (
          <Popup
            position={[
              activeKindergarten.coordinates.split(",")[0],
              activeKindergarten.coordinates.split(",")[1],
            ]}
            onClose={() => setInactive()}
          >
            <div>
              {activeKindergarten.name}
              <p>{activeKindergarten.address}</p>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}
