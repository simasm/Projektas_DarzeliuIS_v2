import React from "react";
import { NavLink, useLocation, useParams } from 'react-router-dom';

import logo from "../../images/logo.png";
import "../../App.css";

import ManagerDropdownList from ".././08CommonComponents/ManagerDropdownList";
import KindergartenContainer from "../.././components/05Kindengarten/KindergartenContainer";
import { QueueContainer } from "../.././components/12Queue/QueueContainer";
import { KindergartenStatContainer } from "../.././components/09Statistics/KindergartenStatContainer";
import ManagerCompensations from "../.././components/02Main/ManagerCompensations";
import SubmittedDocsContainer from "../.././components/13UserDocuments/SubmittedDocsContainer";
import UpdateProfileFormContainer from "../.././components/06UpdateProfile/UpdateProfileFormContainer";

import ManagerCompesationContext from "../11Context/ManagerCompesationContext";

import LogoutContainer from "./LogoutContainer";

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';



function Navigation(props) {
  const { compState } = React.useContext(ManagerCompesationContext);
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const brdcrmb = compState.map((item) => item.childName + ' ' + item.childSurname);
  const x = useParams();

  // const breadcrumbNameMap = {
  //   '/eile': 'Prašymų eilė',
  //   '/statistika': 'Prašymų statistika',
  //   '/kompensacijos': 'Prašymai dėl kompensacijos',
  //   '/kompensacijos/147': 'hkl',
  //   '/pazymos': 'Pažymos',
  //   '/profilis': 'Profilis'

  // };
  const breadcrumbNameMap = (id) =>  {
    var obj=   "/kompensacijos/" + id  ;
    var obj2 = "/kompensacijos/download/" + id;
    return  {
          '/eile': 'Prašymų eilė',
         '/statistika': 'Prašymų statistika',
         '/kompensacijos': 'Prašymai dėl kompensacijos',
         [obj] : 'Kompensacijos prašymo peržiūra',
         [obj2] : 'Kompensacijos atsisiuntimas',
         '/pazymos': 'Pažymos',
         '/profilis': 'Profilis' 
     }
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
                  id="navManagerKindergartenList"
                  to={"/darzeliai"}
                >
                  Darželių sąrašas
                </NavLink>
              </li>

              <li className="nav-item mr-2">
                <ManagerDropdownList />
              </li>

              <li className="nav-item me-2">
                <NavLink
                  className="nav-link"
                  id="navManagerDocuments"
                  to={"/pazymos"}
                >
                  Pažymos
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink 
                  className="nav-link" 
                  id="navManagerMapWindow" 
                  to={"/zemelapis"}>
                    Žemėlapis
                </NavLink>
              </li>

              <li className="nav-item me-2">
                <NavLink
                  className="nav-link"
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
      <div className="container" style={{ backgroundColor: 'rgb(249, 249, 249)' }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <NavLink underline="hover" color="inherit" to="/">
          Pagrindinis puslapis
          </NavLink>
          {pathnames.map((value, index) => { 
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            console.log("value: " + value + ", index: " + index + ", pathname length: " + pathnames.length
                                  + "\nto object:\n" + JSON.stringify(to));
            return last ? (
              <Typography color="text.primary" key={to}>
                {breadcrumbNameMap(value)[to]}
              </Typography>
            ) : (
              <NavLink underline="hover" color="inherit" to={to} key={to}>
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
