import React, { useEffect, useState, useRef } from "react";
import Map from "./Map";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";

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
          <div
            className="bg-light pb-3 col-12 col-sm-12 col-md-12 col-lg-3 pt-1"
            style={{
              overflowY: "scroll",
              height: "400px",
              border: "2px groove grey",
            }}
          >
            {kindergartens.map((k) => (
              <div
                key={k.id}
                id={k.id}
                style={
                  activeKindergarten !== null && activeKindergarten.id === k.id
                    ? { border: "solid 1px black" }
                    : { border: "none" }
                }
                onClick={() => setActive(k)}
              >
                {k.name}
              </div>
            ))}
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
