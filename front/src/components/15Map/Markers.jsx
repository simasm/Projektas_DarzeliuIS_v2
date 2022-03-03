import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { Icon } from "leaflet";
import markerIcon from "../../images/burbuls.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function Markers({
  kindergartens,
  activeKindergarten,
  setActiveThroughMarker,
  setInactive,
  setActive,
}) {
  const dot = new Icon({
    iconUrl: markerIcon,
    iconSize: [25, 25],
  });

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
          icon={dot}
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
