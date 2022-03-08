import React, { useEffect } from "react";
import { Marker, Popup, useMap, Circle } from "react-leaflet";
import L, { Icon } from "leaflet";
import markerIcon from "../../images/dot.png";
import homeIcon from "../../images/home.png";

export default function Markers({
  kindergartens,
  activeKindergarten,
  setActiveThroughMarker,
  setInactive,
  userCoordinates,
  userAddress,
  isBubble,
  bubbleCoordinates,
  bubbleRadius,
}) {
  const dot = new Icon({
    iconUrl: markerIcon,
    iconSize: [40, 40],
  });

  const userIcon = new Icon({
    iconUrl: homeIcon,
    iconSize: [30, 50],
  });

  const map = useMap();
  useEffect(() => {
    if (activeKindergarten !== null) {
      map.flyTo([
        activeKindergarten.coordinates.split(",")[0],
        activeKindergarten.coordinates.split(",")[1],
      ]);
    }
  }, [activeKindergarten]);

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
        >
          <Popup
            position={[
              userCoordinates.split(",")[1],
              userCoordinates.split(",")[0],
            ]}
            onClose={() => setInactive()}
          >
            Jūsų gyvenamoji vieta
          </Popup>
        </Marker>
      )}

      {isBubble === true && bubbleCoordinates !== null && (
        <Circle
          center={[
            bubbleCoordinates.split(",")[1],
            bubbleCoordinates.split(",")[0],
          ]}
          radius={bubbleRadius}
        ></Circle>
      )}

      {activeKindergarten && (
        <Popup
          position={[
            activeKindergarten.coordinates.split(",")[0],
            activeKindergarten.coordinates.split(",")[1],
          ]}
          onClose={() => setInactive()}
        >
          <div className="kindergarteninfo-popup">
            <p className="mt-2 ">
              Vilniaus lopšelis-darželis „{activeKindergarten.name}“
            </p>
            <p>
              {activeKindergarten.address},{"  "}
              {activeKindergarten.elderate} seniūnija
            </p>
          </div>
        </Popup>
      )}
    </div>
  );
}
