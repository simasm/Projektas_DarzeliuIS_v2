import React, { useState } from "react";
import "../../App.css";
import SearchBox from "./../08CommonComponents/SeachBox";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

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
  bubbleCoordinates,
  setIds,
  ids,
  isBubble,
  setInactive,
  setActiveThroughMarker,
}) {
  const [bubbleRadiusTmp, setBubbleRadiusTmp] = useState("");
  const [bubbleAddressTmp, setBubbleAddressTmp] = useState("");
  const addresses = [];

  {
    kindergartens.map((k) => addresses.push(k.address));
  }

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
    if (e.target.value === "") {
      setBubbleAddressTmp("");
    } else {
      setBubbleAddressTmp(e.target.value);
    }
  };

  const handleRadiusInput = (e) => {
    const re = /^[0-9\b,.]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setBubbleRadiusTmp(e.target.value);
    }
  };

  const SearchKindergartenExact = (bubbleaddress) => {
    if (bubbleRadiusTmp == 0 || bubbleRadiusTmp === "")
      kindergartens.map((k) =>
        k.address === bubbleaddress ? setActiveThroughMarker(k) : ""
      );
  };

  const handleBubbleSearch = () => {
    SearchKindergartenExact(bubbleAddressTmp.split(",")[0]);

    if (
      bubbleAddressTmp !== "" &&
      bubbleRadiusTmp !== "" &&
      bubbleRadiusTmp != 0
    ) {
      setInactive();
      setBubbleAddress(bubbleAddressTmp + ", Vilnius");
      setBubbleRadius(bubbleRadiusTmp.replaceAll(",", ".") * 1000);

      setIsBubble(true);
      getBubbleCoordinates();
    }
  };

  const handleBubbleClear = () => {
    setIsBubble(false);
    setBubbleAddressTmp("");
    setBubbleRadiusTmp("");
  };

  return (
    <div>
      {isBubble ? (
        <div className="ps-2 all-kindergarten-map sidemenubox">
          {kindergartens.map((k) =>
            ids.includes(k.id) ? (
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
                <span className="elderatetag">{k.elderate} sen.</span>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      ) : (
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
              <span className="elderatetag">{k.elderate} sen.</span>
            </div>
          ))}
        </div>
      )}

      <div className="pt-1 d-flex justify-content-center ">
        <SearchBox
          onSearch={handleSearch}
          placeholder={"Ieškokite pagal pavadinimą ar seniūniją"}
        />
      </div>

      <div className="pt-5 sidemenubox2">
        <h6>
          Ieškokite pagal adresą
          <span
            title={
              "Galite ieškoti darželių aplink jūsų pasirinktą vietovę. Į adreso įvedimo lauką įveskite vietos adresą, o į atstumo įvedimo lauką įveskite atstumą kilometrais. Žemėlapyje bus sugeneruotas plotas su į jį patenkančiais darželiais. Jei norite ieškoti konkretaus darželio pagal tikslų adresą, įvedę adresą atstumo įvedimo lauke įrašykite 0 arba palikite tuščią."
            }
          >
            {" "}
            &nbsp;
            <FontAwesomeIcon icon={faQuestionCircle} />
          </span>
        </h6>
        <input
          className="form-control mt-2"
          id="addressInput"
          placeholder="Įveskite adresą"
          value={bubbleAddressTmp}
          onChange={(e) => handleAddressInput(e)}
        />
        <div className="input-container radius-input">
          <input
            className="form-control mt-2"
            id="radiusInput"
            value={bubbleRadiusTmp}
            onChange={(e) => handleRadiusInput(e)}
            maxLength={4}
          />
          <span className="unit">km</span>
        </div>
        <div className="row buttons-container">
          <button
            className="btn btn-primary mt-2 col-6"
            onClick={() => handleBubbleSearch()}
          >
            Ieškoti
          </button>
          <div className="col-2"></div>

          <button
            className="btn btn-outline-danger mt-2 col-4"
            onClick={() => handleBubbleClear()}
          >
            Panaikinti
          </button>
        </div>
      </div>
    </div>
  );
}
