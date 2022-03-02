import React from "react";

export default function SideMenu({
  activeKindergarten,
  kindergartens,
  setActive,
}) {
  return (
    <div>
      <div
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
                ? {
                    border: "groove 2px lightgrey",
                    background: "#61b1dc",
                  }
                : { border: "none" }
            }
            onClick={() => setActive(k)}
          >
            {k.name}
          </div>
        ))}
      </div>

      <div
        className="mt-5"
        style={{
          overflowY: "scroll",
          height: "100px",
          border: "2px groove grey",
        }}
      >
        {activeKindergarten !== null && (
          <div className="sidemenuinfo">
            <p className="mt-2 ">
              Vilniaus lopšelis-darželis "{activeKindergarten.name}"
            </p>
            <p>
              Adresas: {activeKindergarten.address},{"  "}
              {activeKindergarten.elderate} seniūnija
            </p>
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
}
