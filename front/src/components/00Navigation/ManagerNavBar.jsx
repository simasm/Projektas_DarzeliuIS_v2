import React from "react";

import { NavLink, useLocation } from "react-router-dom";

import logo from "../../images/logo.png";
import "../../App.css";

import ManagerDropdownList from ".././08CommonComponents/ManagerDropdownList";

import LogoutContainer from "./LogoutContainer";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

function Navigation(props) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap = (id) => {
    var obj = "/kompensacijos/" + id;
    var obj2 = "/kompensacijos/download/" + id;
    return {
      "/eile": "Prašymų eilė",
      "/statistika": "Registracijų statistika",
      "/kompensacijos": "Prašymai dėl kompensacijos",
      [obj]: "Kompensacijos prašymo peržiūra",
      [obj2]: "Kompensacijos atsisiuntimas",
      "/pazymos": "Pažymos",
      "/profilis": "Profilis",
      "/zemelapis": "Žemėlapis",
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
            <ul className="navbar-nav nav-pills nav-pillsr ms-auto">
              <li className="nav-item me-2">
                <NavLink
                  className="nav-link"
                  activeStyle={{color : "white"}}
                  
                  id="navManagerKindergartenList"
                  to={"/darzeliai"}
                >
                  Darželių sąrašas
                </NavLink>
              </li>

              <li className="nav-item mr-2 dropdown-z">
                <ManagerDropdownList />
              </li>

              <li className="nav-item me-2">
                <NavLink
                  className="nav-link "
                  activeStyle={{color : "white"}}

                  id="navManagerDocuments"
                  to={"/pazymos"}
                >
                  Pažymos
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                
                  className="nav-link"
                  activeStyle={{color : "white"}}

                  id="navManagerMapWindow"
                  to={"/zemelapis"}
                >
                  Žemėlapis
                </NavLink>
              </li>

              <li className="nav-item me-2">
                <NavLink
                  className="nav-link"
                  activeStyle={{color : "white"}}

                  id="navManagerMyAccount"
                  to={"/profilis"}
                >
                  Mano paskyra
                </NavLink>
              </li>

              <li className="nav-item nav-item me-2" id="navManagerLogout">
                <LogoutContainer />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <BreadcrumbsItem to='/'>Darželių sąrašas</BreadcrumbsItem> */}
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
