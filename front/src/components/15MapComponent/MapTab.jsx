import React, { useEffect, useState } from "react";
import "../../App.css";
import { useHistory } from "react-router-dom";
import apiEndpoint from "../10Services/endpoint";
import http from "../10Services/httpService";
import SearchBox from "./../08CommonComponents/SeachBox";
import MapWindow from "./MapWindow";

export default function MapTab() {
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
          <div className="row">
            <div
              className="bg-light pb-3 col-12 col-sm-12 col-md-12 col-lg-3 pt-1 all-kindergarten-map">
              <div>
                {kindergartens.map((k) => (
                <div
                  key={k.id}
                  id={k.id}
                  className={"all-kindergarten-map-select" + 
                  (activeKindergarten !== null && activeKindergarten.id === k.id 
                    ? ''
                    : 'active'
                    )
                  }
                  onClick={() => setActive(k)}
                >
                  {k.name}
                </div>
                
                ))}
                
              </div>
              
            </div>
                  
            {/* ############################## MAPAS ######################################## */}
  
            <div className="col-lg-9">
              <MapWindow
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