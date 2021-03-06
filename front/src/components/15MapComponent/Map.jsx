import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "../../App.css";
import HomeButton from "./HomeButton";

import MapControls from "./MapControls";

import Markers from "./Markers";

export default function Map({
  kindergartens,
  activeKindergarten,
  setActive,
  setInactive,
  setActiveThroughMarker,
  userCoordinates,
  userAddress,
  state,
  isBubble,
  bubbleCoordinates,
  bubbleRadius,
  ids,
  setIds,
}) {
  return (
    <div>
      <MapContainer
        center={[54.683289, 25.275109]}
        zoom={14}
        className={"map-css"}
        maxBounds={[
          [56.512836, 20.952348],
          [53.711664, 27.56842],
        ]}
      >
        <TileLayer
          className={"map-depth"}
          minZoom={8}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        />
        {state.role === "USER" &&
        userCoordinates !== "" &&
        (userAddress.includes("vilnius") || userAddress.includes("Vilnius")) ? (
          <HomeButton userCoordinates={userCoordinates} />
        ) : (
          <></>
        )}

        <Markers
          kindergartens={kindergartens}
          activeKindergarten={activeKindergarten}
          setActiveThroughMarker={setActiveThroughMarker}
          setInactive={setInactive}
          setActive={setActive}
          userCoordinates={userCoordinates}
          userAddress={userAddress}
          isBubble={isBubble}
          bubbleCoordinates={bubbleCoordinates}
          bubbleRadius={bubbleRadius}
          ids={ids}
          setIds={setIds}
        />

        <MapControls
          userCoordinates={userCoordinates}
          userAddress={userAddress}
          isBubble={isBubble}
          bubbleCoordinates={bubbleCoordinates}
        />
      </MapContainer>
    </div>
  );
}
