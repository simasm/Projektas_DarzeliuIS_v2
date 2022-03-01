import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import '../../App.css';

const position = [54.688239,25.288033]

export default function MapWindow() {
  return (
    <div className="container">
      <div>
        <MapContainer center={position} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            All info about YOU <br /> Yes yes, YOU.
          </Popup>
        </Marker>
        </MapContainer>
      </div>
    </div>
  );
}