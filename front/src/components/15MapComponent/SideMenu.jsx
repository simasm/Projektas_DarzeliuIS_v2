import React from "react";
import "../../App.css";
import SearchBox from "./../08CommonComponents/SeachBox";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";

export default function SideMenu({
  activeKindergarten,
  kindergartens,
  setActive,
  setKindergartens,
}) {
  async function getFilteredKindergartens(searchString) {
    const searchResponse = await http.get(
      apiEndpoint + `/api/darzeliai/searchBy=${searchString}`
    );

    setKindergartens(searchResponse.data);
  }

  const handleSearch = (e) => {
    const searchString = e.target.value;
    getFilteredKindergartens(searchString);
  };

  return (
    <div>
      <div className="ps-2 all-kindergarten-map sidemenubox">
        {kindergartens.map((k) => (
          <div
            key={k.id}
            id={k.id}
            className={
              activeKindergarten !== null && activeKindergarten.id === k.id
                ? "all-kindergarten-map-select"
                : "inactive-kindergarten"
            }
            onClick={() => setActive(k)}
          >
            {k.name}
          </div>
        ))}
      </div>

      <div className="pt-2 d-flex justify-content-center ">
        <SearchBox onSearch={handleSearch} />
      </div>

      {/* <div className="mt-5 info-box sidemenubox">
        {activeKindergarten === null && (
          <div>
            <p className="mt-2 ">
              <i>Pasirinkite darželį norėdami matyti tikslesnę informaciją.</i>
            </p>
          </div>
        )}
        {activeKindergarten !== null && (
          <div>
            <p className="mt-2 ">
              Vilniaus lopšelis-darželis "{activeKindergarten.name}"
            </p>
            <p>
              {activeKindergarten.address},{"  "}
              {activeKindergarten.elderate} seniūnija
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
}
