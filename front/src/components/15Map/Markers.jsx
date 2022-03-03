import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

export default function Markers({
  kindergartens,
  activeKindergarten,
  setActiveThroughMarker,
  setInactive,
  setActive,
}) {
  useEffect(() => {
    if (activeKindergarten !== null) {
      map.flyTo([
        activeKindergarten.coordinates.split(",")[0],
        activeKindergarten.coordinates.split(",")[1],
      ]);
    }
  }, [activeKindergarten]);
  const map = useMap();
  return (
    <div>
      {kindergartens.map((k) => (
        <Marker
          key={k.id}
          position={[k.coordinates.split(",")[0], k.coordinates.split(",")[1]]}
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
            <h6>{activeKindergarten.name}</h6>
          </div>
        </Popup>
      )}
    </div>
  );
}
