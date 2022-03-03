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

  const provider = new EsriProvider();

  if (userAddress !== "") {
    provider
      .search({ query: userAddress })
      .then((response) =>
        setUserCoordinates(response[0].x + "," + response[0].y)
      );
  }

  const setActive = (kindergarten) => {
    setActiveKindergarten(kindergarten);
  };

  const setActiveThroughMarker = (kindergarten) => {
    setActiveKindergarten(kindergarten);
    var tgtElement = document.getElementById(kindergarten.id);
    tgtElement.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  const setInactive = () => {
    setActiveKindergarten(null);
  };

  useEffect(() => {
    async function getKindergartens() {
      await http
        .get(`${apiEndpoint}/api/darzeliai/visi`)
        .then((response) => setKindergartens(response.data));
    }

    getKindergartens();
    if (state.role === "USER") {
      getUserAddress();
    }
  }, []);

  async function getUserAddress() {
    await http
      .get(`${apiEndpoint}/api/users/user`)
      .then((response) => setUserAddress(response.data.address));
  }

  if (activeKindergarten !== null) {
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
