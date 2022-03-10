import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import AuthContext from "../11Context/AuthContext";

export default function MapControls({
  userCoordinates,
  userAddress,
  isBubble,
  bubbleCoordinates,
  activeKindergarten,
}) {
  const { state } = React.useContext(AuthContext);

  const map = useMap();

  useEffect(() => {
    if (
      (state.role === "USER" &&
        userCoordinates !== "" &&
        userAddress.includes("Vilnius")) ||
      userAddress.includes("vilnius")
    ) {
      map.flyTo([userCoordinates.split(",")[1], userCoordinates.split(",")[0]]);
    }
  }, [userCoordinates]);

  useEffect(() => {
    if (isBubble && bubbleCoordinates !== null) {
      map.flyTo([
        bubbleCoordinates.split(",")[1],
        bubbleCoordinates.split(",")[0],
      ]);
    }
  }, [bubbleCoordinates]);

  return <div></div>;
}
