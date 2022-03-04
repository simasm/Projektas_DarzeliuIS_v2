import React, { useEffect } from "react";
import { Marker, Popup, useMap, Circle} from "react-leaflet";
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
}) {
  const dot = new Icon({
    iconUrl: markerIcon,
    iconSize: [40, 40],
  });

  const userIcon = new Icon({
    iconUrl: homeIcon,
    iconSize: [30, 50],
  });

  // const circle = L.circle([userCoordinates.split(",")[1],
  // userCoordinates.split(",")[0],], {
  //   color: 'red',
  //   fillColor: '#f03',
  //   fillOpacity: 0.5,
  //   radius: 500
  // });

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

      {userCoordinates !== "" && (
        <Circle 
          center={[userCoordinates.split(",")[1],
            userCoordinates.split(",")[0],]} 
          radius={500} 
        />
      )}
      
      
    </div>
  );
}
