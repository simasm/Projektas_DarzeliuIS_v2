import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import logo from "../../images/logo.png";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: require("../../images/redMarker.png"),
    iconSize: [_iconSize]
  })
}

export default function MapWindow({
  kindergartens,
  activeKindergarten,
  setActive,
  setInactive,
  setActiveThroughMarker,
}) {
  return (
    <div>
      {/* {activeKindergarten === null ? <div>A</div> : <div>B</div>} */}
      <MapContainer
        center={[54.687665,25.283985]}
        zoom={13}
        className={"map-css"}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {kindergartens.map((k) => (
          <Marker icon={GetIcon(20)}
            key={k.id}
            position={[
              k.coordinates.split(",")[0],
              k.coordinates.split(",")[1],
            ]}
            eventHandlers={{
              click: () => setActiveThroughMarker(k),
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