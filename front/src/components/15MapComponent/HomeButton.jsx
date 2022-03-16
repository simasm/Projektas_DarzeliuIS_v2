import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useMap, Popup } from "react-leaflet";

export default function HomeButton({ userCoordinates }) {
  const map = useMap();

  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

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
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {hover ? "Rodyti mano gyvenamąją vietą " : ""}
        <FontAwesomeIcon icon={faHome} />
      </button>
    </div>
  );
}
