import React, { Component } from "react";

import "../../App.css";
import swal from "sweetalert";

import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";

import UserApplicationsTable from "./UserApplicationsTable";
export class UserHomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationStatus: false,
      applications: [],
    };
  }
  componentDidMount() {
    this.getUserApplications();
    this.getRegistrationStatus();
  }

  getUserApplications() {
    http
      .get(`${apiEndpoint}/api/prasymai/user`)
      .then((response) => {
        this.setState({ applications: response.data });
      })
      .catch(() => { });
  }

  getRegistrationStatus() {
    http
      .get(`${apiEndpoint}/api/status`)
      .then((response) => {
        this.setState(
          {
            registrationStatus: response.data.registrationActive,
          }
        );
      })
      .catch(() => {});
  }

  handleDelete = (item) => {
    swal({
      text: "Ar tikrai norite ištrinti prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        http
          .delete(`${apiEndpoint}/api/prasymai/user/delete/${item.id}`)
          .then((response) => {
            swal({
              text: response.data,
              button: "Gerai",
            });
            this.getUserApplications();
          })
          .catch(() => { });
      }
    });
  };

  drawMessageQueueApproved(obj) {
    console.log("prior status:" + JSON.stringify(obj));
    const status = obj.map(that => that.status);
    if (status != 'Pateiktas' && !this.state.registrationStatus) {
      console.log("+Prašymo statusas: " + status + ", registration status: " + this.state.registrationStatus);
      return (
        <div className="alert alert-warning p-1" role="alert">
          Prašymų registracija baigėsi, eilės patvirtintos
        </div>
      );
    }
    else {
      console.log("-Prašymo statusas: " + status + ", registration status: " + this.state.registrationStatus);
    }
  }

  render() {
    const { length: count } = this.state.applications;

    if (count === 0)
      return (
        <div className="container pt-4">
          <h6 className="pl-2 pt-3">Jūs neturite pateiktų prašymų.</h6>
        </div>
      );

    return (
      <div className="container pt-4">
        <h5 className="pl-2 pt-3">Mano prašymai</h5>

        {this.drawMessageQueueApproved(this.state.applications)}

        <div className="row pt-2">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <UserApplicationsTable
              applications={this.state.applications}
              onDelete={this.handleDelete}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserHomeContainer;
