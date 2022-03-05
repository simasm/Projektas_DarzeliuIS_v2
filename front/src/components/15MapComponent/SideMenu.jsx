import React from "react";
import "../../App.css";

export default function SideMenu({
  activeKindergarten,
  kindergartens,
  setActive,
}) {
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

      <div className="mt-5 info-box sidemenubox">
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
      </div>
    </div>
  );
}
