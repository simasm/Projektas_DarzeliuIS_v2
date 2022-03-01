import React from "react"
import MapFilter from "./MapFilter"
import MapWindow from "./MapWindow"
import "../../App.css";
import SearchBox from "./../08CommonComponents/SeachBox";

export default function MapTab() {
    return (
        <div className="container pt-4">
            <div className="row">
                <div className="col-3">
                    <MapFilter/>
                    <SearchBox
                    placeholder={"Ieškoti darželio pagal pavadinimą"}
                    />
                </div>
                <div className="col-9" style={{height: "400px"}}>
                    <MapWindow/>
                </div>
            </div>
        </div>
    )
}