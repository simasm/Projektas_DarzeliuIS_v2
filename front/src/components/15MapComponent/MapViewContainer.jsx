import React, { useEffect, useState, useContext } from "react";
import Map from "./Map";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import SideMenu from "./SideMenu";
import { EsriProvider } from "leaflet-geosearch";
import AuthContext from "../11Context/AuthContext";

export default function MapTab() {
  const { state } = React.useContext(AuthContext);

  const [kindergartens, setKindergartens] = useState([]);
  const [activeKindergarten, setActiveKindergarten] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [userCoordinates, setUserCoordinates] = useState("");

  const [bubbleAddress, setBubbleAddress] = useState("");
  const [bubbleCoordinates, setBubbleCoordinates] = useState(null);
  const [bubbleRadius, setBubbleRadius] = useState("");
  const [isBubble, setIsBubble] = useState(false);

  const [ids, setIds] = useState([]);

  const provider = new EsriProvider();

  const setActive = (kindergarten) => {
    setActiveKindergarten(kindergarten);
  };

  const setInactive = () => {
    setActiveKindergarten(null);
  };

  const setActiveThroughMarker = (kindergarten) => {
    setActiveKindergarten(kindergarten);
    var tgtElement = document.getElementById(kindergarten.id);
    tgtElement.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  async function getKindergartens() {
    await http
      .get(`${apiEndpoint}/api/darzeliai/visi`)
      .then((response) => setKindergartens(response.data));
  }

  async function getUserAddress() {
    await http
      .get(`${apiEndpoint}/api/users/user`)
      .then((response) => setUserAddress(response.data.address));
  }

  const getUserCoordinates = () => {
    provider
      .search({ query: userAddress })
      .then((response) =>
        setUserCoordinates(response[0].x + "," + response[0].y)
      )
      .catch((error) => "");
  };

  useEffect(() => {
    if (bubbleCoordinates !== "") {
      getBubbleCoordinates();
    }
  }, [bubbleAddress]);

  const getBubbleCoordinates = () => {
    provider
      .search({ query: bubbleAddress })
      .then((response) =>
        setBubbleCoordinates(response[0].x + "," + response[0].y)
      )
      .catch((error) => "65line");
  };

  useEffect(() => {
    var array = [];
    getKindergartens();
    if (state.role === "USER") {
      getUserAddress();
    }

    if (userAddress !== "") {
      getUserCoordinates();
    }

    {
      kindergartens.map((k) => {
        array.push([k.id, k.coordinates]);
      });
    }
  }, [userAddress]);

  function getDistance(bubbleCoordinates, kindergarten) {
    function toRadian(degree) {
      return (degree * Math.PI) / 180;
    }

    var lon1 = toRadian(bubbleCoordinates[1]),
      lat1 = toRadian(bubbleCoordinates[0]),
      lon2 = toRadian(kindergarten.coordinates.split(",")[1]),
      lat2 = toRadian(kindergarten.coordinates.split(",")[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a =
      Math.pow(Math.sin(deltaLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;

    if (c * EARTH_RADIUS * 1000 <= bubbleRadius) {
      ids.push(kindergarten.id);
      return kindergarten.id;
    }
  }

  if (bubbleCoordinates !== null) {
    kindergartens.forEach((k) =>
      getDistance(
        [bubbleCoordinates.split(",")[1], bubbleCoordinates.split(",")[0]],
        k
      )
    );
  }

  return (
    <div>
      {/*################################# SIDE MENU ######################################## */}

      <div className="container pt-4">
        <div className="row ">
          <div className="bg-light pb-3 col-lg-3">
            <SideMenu
              kindergartens={kindergartens}
              activeKindergarten={activeKindergarten}
              setActive={setActive}
              setInactive={setInactive}
              setKindergartens={setKindergartens}
              setBubbleAddress={setBubbleAddress}
              setBubbleRadius={setBubbleRadius}
              bubbleRadius={bubbleRadius}
              getBubbleCoordinates={getBubbleCoordinates}
              bubbleAddress={bubbleAddress}
              setIsBubble={setIsBubble}
              bubbleCoordinates={bubbleCoordinates}
              setIds={setIds}
              ids={ids}
              isBubble={isBubble}
              setActiveThroughMarker={setActiveThroughMarker}
            />
          </div>

          {/* ############################## MAPAS ######################################## */}

          <div className="col-lg-9">
            <Map
              kindergartens={kindergartens}
              activeKindergarten={activeKindergarten}
              setActive={setActive}
              setInactive={setInactive}
              setActiveThroughMarker={setActiveThroughMarker}
              userCoordinates={userCoordinates}
              userAddress={userAddress}
              state={state}
              isBubble={isBubble}
              bubbleCoordinates={bubbleCoordinates}
              bubbleRadius={bubbleRadius}
              ids={ids}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
