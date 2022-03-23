import React, { useEffect, useState } from "react";
import "../../App.css";
import SearchBox from "./../08CommonComponents/SeachBox";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export default function SideMenu({
  activeKindergarten,
  kindergartens,
  setActive,
  setKindergartens,
  setBubbleAddress,
  setBubbleRadius,
  getBubbleCoordinates,
  setIsBubble,
  ids,
  isBubble,
  setInactive,
  setActiveThroughMarker,
}) {
  const [bubbleRadiusTmp, setBubbleRadiusTmp] = useState("");
  const [bubbleAddressTmp, setBubbleAddressTmp] = useState("");
  const [searchString, setSearchString] = useState("");
  const [radiusValid, setRadiusValid] = useState(true);
  const [objectAddressValid, setObjectAddressValid] = useState(true);
  const [invalidSearch, setInvalidSearch] = useState(false);

  const addresses = [];

  kindergartens.map((k) => addresses.push(k.address));

  async function getFilteredKindergartens(searchString) {
    const searchResponse = await http.get(
      apiEndpoint + `/api/darzeliai/searchBy=${searchString}`
    );

    setKindergartens(searchResponse.data);
  }

  const handleSearchStringChange = (e) => {
    const string = e.target.value;
    const re = /^[a-zA-Zą-ž\s-]+$/;
    if (string === "" || re.test(string)) {
      setSearchString(string);
    } else {
      setInvalidSearch(true);
      setTimeout(() => setInvalidSearch(false), 500);
    }
  };

  useEffect(() => {
    getFilteredKindergartens(searchString);
  }, [searchString]);

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
    } else {
      setRadiusValid(false);
      setTimeout(() => setRadiusValid(true), 500);
    }
  };

  const SearchKindergartenExact = (bubbleaddress) => {
    if (bubbleRadiusTmp === "0" || bubbleRadiusTmp === "") {
      setIsBubble(false);
      kindergartens.map((k) =>
        k.address === bubbleaddress ? setActiveThroughMarker(k) : ""
      );
    }
  };

  const handleBubbleSearch = () => {
    SearchKindergartenExact(bubbleAddressTmp.split(",")[0]);
    if (bubbleRadiusTmp === "" || bubbleRadiusTmp === "0") {
      setRadiusValid(false);
      setTimeout(() => setRadiusValid(true), 2000);
    }

    if (bubbleAddressTmp === "") {
      setObjectAddressValid(false);
      setTimeout(() => setObjectAddressValid(true), 2000);
    }

    if (
      bubbleAddressTmp !== "" &&
      bubbleRadiusTmp !== "" &&
      bubbleRadiusTmp !== "0"
    ) {
      setInactive();
      setBubbleAddress(bubbleAddressTmp + ", Vilnius");
      setBubbleRadius(bubbleRadiusTmp.replaceAll(",", ".") * 1000);

      setIsBubble(true);
      getBubbleCoordinates();
    }
  };

  const handleBubbleClear = () => {
    setInactive();
    setIsBubble(false);
    setBubbleAddressTmp("");
    setBubbleRadiusTmp("");
    setSearchString("");
  };

  const handleExplanation = () => {
    const text =
      "<h6>Galite ieškoti darželių aplink konkrečią vietą tam tikru spinduliu</h6>" +
      "<br/>" +
      "<p>1. Į adreso įvedimo lauką galite įrašyti konkretų adresą, gatvę, objekto pavadinimą, ar rajoną (pvž.: Pašilaičiai)</p>" +
      "<p>2. Į atstumo įvedimo lauką įrašykitę paieškos atstumą kilometrais aplink pasirinktą vietą</p>" +
      "<p>3. Spauskite „Ieškoti“</p>" +
      "<p>Žemėlapyje bus sugeneruotas plotas su į jį patenkančiais darželiais.</p>";

    Swal.fire({
      html: text,

      showCloseButton: true,

      confirmButtonText: "Uždaryti",
      confirmButtonColor: "#0080ff",
    });
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
          onSearch={handleSearchStringChange}
          value={searchString}
          placeholder={"Ieškokite pagal pavadinimą ar seniūniją"}
          style={
            invalidSearch
              ? { border: "2px solid red" }
              : { border: "2px solid lightgrey" }
          }
        />
      </div>

      <div className="pt-5 sidemenubox2">
        <h6>
          Ieškokite pagal adresą ar seniūniją
          <span className="questionmarkbtn" onClick={handleExplanation}>
            &nbsp; <FontAwesomeIcon icon={faQuestionCircle} />
          </span>
        </h6>
        <input
          className="form-control mt-2"
          style={
            objectAddressValid
              ? { border: "1px solid lightgray" }
              : { border: "2px solid red" }
          }
          id="addressInput"
          placeholder="Įveskite adresą"
          value={bubbleAddressTmp}
          onChange={(e) => handleAddressInput(e)}
        />
        <div className="input-container radius-input">
          <input
            className="form-control mt-2"
            style={
              radiusValid
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            id="radiusInput"
            value={bubbleRadiusTmp}
            onChange={(e) => handleRadiusInput(e)}
            maxLength={4}
          />
          <span className="unit">km</span>
        </div>
        <div className="row buttons-container">
          <button
            className="btn btn-primary mt-2 col-5"
            onClick={() => handleBubbleSearch()}
          >
            Ieškoti
          </button>
          <div className="col-1"></div>

          <button
            className="btn btn-outline-danger mt-2 col-6"
            onClick={() => handleBubbleClear()}
          >
            Išvalyti laukus
          </button>
        </div>
      </div>
    </div>
  );
}
