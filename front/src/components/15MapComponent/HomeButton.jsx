import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useMap } from "react-leaflet";

export default function HomeButton({ userCoordinates }) {
  const map = useMap();

  const toHome = () => {
    map.flyTo(
      [userCoordinates.split(",")[1], userCoordinates.split(",")[0]],
      15
    );
  };

  return (
    <div id="map">
      <button
        id="maphomebtn"
        className="btn btn-primary "
        onClick={() => toHome()}
      >
        <FontAwesomeIcon icon={faHome} />
      </button>
    </div>
  );
}
