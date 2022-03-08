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
    console.log(bubbleCoordinates, "<<<<<<<<<<");
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
    getKindergartens();
    if (state.role === "USER") {
      getUserAddress();
    }

    if (userAddress !== "") {
      getUserCoordinates();
    }
    console.log(bubbleCoordinates, "<<<<<<<<<<");
  }, [userAddress]);

  if (activeKindergarten !== null) {
  }
  return (
    <div>
      <div>{userAddress}</div>
      {/*################################# SIDE MENU ######################################## */}

      <div className="container pt-4">
        <div className="row ">
          <div className="bg-light pb-3 col-lg-3">
            <SideMenu
              kindergartens={kindergartens}
              activeKindergarten={activeKindergarten}
              setActive={setActive}
              setKindergartens={setKindergartens}
              setBubbleAddress={setBubbleAddress}
              setBubbleRadius={setBubbleRadius}
              bubbleRadius={bubbleRadius}
              getBubbleCoordinates={getBubbleCoordinates}
              bubbleAddress={bubbleAddress}
              setIsBubble={setIsBubble}
              bubbleCoordinates={bubbleCoordinates}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
