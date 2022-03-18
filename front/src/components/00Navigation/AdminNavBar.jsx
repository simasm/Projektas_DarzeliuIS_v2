import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import logo from "../../images/logo.png";
import "../../App.css";

import LogoutContainer from "./LogoutContainer";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

function Navigation(props) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap = () => {
    return {
      "/eile": "Prašymų eilė",
      "/statistika": "Registracijų statistika",
      "/prasymai": "Sąrašo redagavimas",
      "/zurnalas": "Įvykių žurnalas",
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-2">
                <NavLink
                  className="nav-link"
                  id="navAdminUserList"
                  to={"/admin"}
                >
                  Naudotojai
                </NavLink>
              </li>

              <li className="nav-item me-2">
                <NavLink
                  className="nav-link"
                  id="navAdminApplicationStats"
                  to={"/statistika"}
                >
                  Registracijų statistika
                </NavLink>
              </li>

              <li className="nav-item me-2">
                <NavLink
                  className="nav-link"
                  id="navManagerApplicationAdmin"
                  to={"/prasymai"}
                >
                  Sąrašo redagavimas
                </NavLink>
              </li>

              <li className="nav-item me-2">
                <NavLink
                  className="nav-link"
                  id="navAdminEventLog"
                  to={"/zurnalas"}
                >
                  Įvykių žurnalas
                </NavLink>
              </li>

              <li className="nav-item me-2">
                <NavLink
                  className="nav-link"
                  id="navAdminMyAccount"
                  to={"/profilis"}
                >
                  Mano paskyra
                </NavLink>
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
