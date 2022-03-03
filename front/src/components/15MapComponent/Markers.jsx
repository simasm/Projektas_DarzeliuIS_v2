import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L, { Icon } from "leaflet";
import markerIcon from "../../images/burbuls.png";

export default function Markers({
  kindergartens,
  activeKindergarten,
  setActiveThroughMarker,
  setInactive,
  userCoordinates,
  userAddress,
}) {
  const dot = new Icon({
    iconUrl: markerIcon,
    iconSize: [20, 20],
  });

  const userIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [40, 40],
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
      {userCoordinates !== "" && (
        <Marker
          icon={userIcon}
          position={[
            userCoordinates.split(",")[1],
            userCoordinates.split(",")[0],
          ]}
        />
      )}
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
