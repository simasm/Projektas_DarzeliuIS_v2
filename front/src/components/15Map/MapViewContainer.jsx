import React, { useEffect, useState, useRef } from "react";
import Map from "./Map";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import SideMenu from "./SideMenu";

export default function MapViewContainer() {
  const [kindergartens, setKindergartens] = useState([]);
  const [activeKindergarten, setActiveKindergarten] = useState(null);

  const setActive = (kindergarten) => {
    setActiveKindergarten(kindergarten);

    console.log(activeKindergarten);
  };

  const setActiveThroughMarker = (kindergarten) => {
    setActiveKindergarten(kindergarten);
    var tgtElement = document.getElementById(kindergarten.id);
    tgtElement.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  const setInactive = () => {
    setActiveKindergarten(null);
    console.log(activeKindergarten);
  };

  useEffect(() => {
    async function getKindergartens() {
      await http
        .get(`${apiEndpoint}/api/darzeliai/visi`)
        .then((response) => setKindergartens(response.data));
    }

    getKindergartens();
  }, []);

  if (activeKindergarten !== null) {
  }
  return (
    <div>
      <div className="container pt-4">
        <div className="row ">
          <div className="bg-light pb-3 col-lg-3 pt-1">
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
