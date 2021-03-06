import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import logo from "../../images/logo.png";
import "../../App.css";
import Dropdown from "../08CommonComponents/Dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import instructionsPdf from "../../documents/VMS_VDIS_naudotojo_gidas.pdf";

import LogoutContainer from "./LogoutContainer";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

function Navigation(props) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap = () => {
    return {
      "/prasymai/registracija": "Prašymas dėl registracijos į darželį",
      "/prasymai/kompensacija": "Prašymas dėl kompensacijos",
      "/prasymai": "Mano prašymai",
      "/pazymos": "Mano pažymos",
      "/statistika": "Registracijų statistika",
      "/zemelapis": "Žemėlapis",
      "/profilis": "Mano paskyra",
    };
  };
  return (
    <div className="pb-4">
      <nav className="navbar navbar-expand-md py-4 navbar-light bg-light">
        <div className="container">
          <NavLink className="navbar-brand" to={"/home"}>
            <img
              className="nav-img"
              src={logo}
              alt="logotipas"
              loading="lazy"
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-pills ms-auto">
              <li className="nav-item mr-1 dropdown-z">
                <Dropdown />
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  activeStyle={{color : "white"}}

                  id="navUserMyApplications"
                   to={"/prasymai"}

                  isActive={(match, location) => {
                    
                    if (match && !match.isExact) {
                      return false;
                    }
                    if (match &&  match.isExact) {
                      return true;
                    }}}
                >
                  Mano prašymai
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  activeStyle={{color : "white"}}

                  id="navUserDocuments"
                  to={"/pazymos"}
                >
                  Mano pažymos
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  activeStyle={{color : "white"}}

                  id="navUserApplicationStats"
                  to={"/statistika"}
                >
                  Registracijų statistika
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  activeStyle={{color : "white"}}

                  id="navUserMapWindow"
                  to={"/zemelapis"}
                >
                  Žemėlapis
                </NavLink>
              </li>

              <li className="nav-item mr-e">
                <NavLink
                  className="nav-link"
                  activeStyle={{color : "white"}}

                  id="navUserMyAccount"
                  to={"/profilis"}
                >
                  Mano paskyra
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <a
                  className="nav-link"
                  id="navInstructions"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={instructionsPdf}
                  title="Parsisiųsti naudotojo instrukciją"
                >
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </a>
              </li>

              <li className="nav-item nav-item me-2">
                <LogoutContainer />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <NavLink
            className="nounderlinelink"
            underline="hover"
            color="inherit"
            to="/"
          >
            Pagrindinis puslapis
          </NavLink>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            return last ? (
              <Typography color="text.primary" key={to}>
                {breadcrumbNameMap(value)[to]}
              </Typography>
            ) : (
              <NavLink
                className="nounderlinelink"
                underline="hover"
                color="inherit"
                to={to}
                key={to}
              >
                {breadcrumbNameMap(value)[to]}
              </NavLink>
            );
          })}
        </Breadcrumbs>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default Navigation;
