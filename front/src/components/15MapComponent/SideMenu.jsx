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
  setBubbleAddress,
  setBubbleRadius,
  bubbleRadius,
  bubbleAddress,
  getBubbleCoordinates,
  setIsBubble,
}) {
  async function getFilteredKindergartens(searchString) {
    const searchResponse = await http.get(
      apiEndpoint + `/api/darzeliai/searchBy=${searchString}`
    );

    setKindergartens(searchResponse.data);
  }

  const handleSearch = (e) => {
    let searchString = e.target.value;

    getFilteredKindergartens(searchString);
  };

  const handleAddressInput = (e) => {
    setBubbleAddress(e.target.value);
    console.log(e.target.value);
  };

  const handleRadiusInput = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setBubbleRadius(Number(e.target.value));
      console.log(e.target.value);
    }
  };

  const handleBubbleSearch = () => {
    if (bubbleAddress !== "" && bubbleRadius !== "") {
      getBubbleCoordinates();
    }
    setIsBubble(true);
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
        <SearchBox
          onSearch={handleSearch}
          placeholder={"Ieškokite pagal pavadinimą ar seniūniją..."}
        />
      </div>

      <div className="ps-2 ">
        <h6>Ieskokite pagal adresa</h6>
        <input
          className="form-control mt-1"
          placeholder="iveskite adresa"
          onChange={(e) => handleAddressInput(e)}
        ></input>
        <input
          className="form-control mt-1"
          placeholder="iveskite atstuma nuo pasirinkto adreso"
          value={bubbleRadius}
          onChange={(e) => handleRadiusInput(e)}
        ></input>
        <button
          className="btn btn-primary ms-1 mt-2"
          style={{ width: "18em" }}
          onClick={() => handleBubbleSearch()}
        >
          ieskoti
        </button>
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
